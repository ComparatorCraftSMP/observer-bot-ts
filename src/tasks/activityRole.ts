import { Guild } from "discord.js";
import cron from "node-cron";
import fetch from "cross-fetch";
import { client } from "../..";

export default async function (): Promise<void> {
  // Schedule a job to run every day at 3 PM
  cron.schedule("* * * * *", async () => {
    const playersQuery = await fetch(
      `https://plan.comparatorcraftsmp.net/v1/players?server=survival`,
      {
        method: "GET",
      }
    );
    const players = await playersQuery.json();

    const playerData = players.data;

    const guild: Guild = await client.guilds.fetch("761670547196739635");
    const members = await guild.members.fetch();

    const role = await guild.roles.fetch("762451328793706496");

    const roleMember = role?.members.forEach((member) => {
      const player = playerData.find(
        (player: any) => player.username.d.replace("@", "") === member.user.tag
      );
      if (!player) return;

      const activity = new Number(player.index.v);
      if (activity >= 2) {
        if (!member.roles.cache.has("1076582329243406347")) {
          member.roles.add("1076582329243406347");
          console.log(` gave ${member.user.tag} activity role`);
        }
      }

      if (activity < 2) {
        if (member.roles.cache.has("1076582329243406347")) {
          member.roles.remove("1076582329243406347");
          console.log(` removed ${member.user.tag} activity role`);
        }
      }
    });
  });
}
