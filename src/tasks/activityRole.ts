import { Guild } from "discord.js";
import cron from "node-cron";
import fetch from "cross-fetch";
import { client } from "../..";
import { config } from "../../config";

export default async function (): Promise<void> {
  // Schedule a job to run every day at 3 PM
  cron.schedule("* * * * *", async () => {
    if (config.active_role.enabled) {
      const playersQuery = await fetch(
        `${config.plan.url}/v1/players?server=${config.plan.server}`,
        {
          method: "GET",
        }
      );
      const players = await playersQuery.json();

      const playerData = players.data;
      const guild: Guild = await client.guilds.fetch(config.guild_id);
      const members = await guild.members.fetch();

      const role = await guild.roles.fetch(config.active_role.member_role_id);

      const roleMember = role?.members.forEach((member) => {
        const player = playerData.find(
          (player: any) =>
            player.username.d.replace("@", "") === member.user.tag
        );
        if (!player) return;

        const activity = new Number(player.index.v);
        if (activity >= 2) {
          if (!member.roles.cache.has(config.active_role.role_id)) {
            member.roles.add(config.active_role.role_id);
            console.log(` gave ${member.user.tag} activity role`);
          }
        }

        if (activity < 2) {
          if (member.roles.cache.has(config.active_role.role_id)) {
            member.roles.remove(config.active_role.role_id);
            console.log(` removed ${member.user.tag} activity role`);
          }
        }
      });
    }
  });
}
