import { Guild } from "discord.js";
import cron from "node-cron";
import fetch from "cross-fetch";
import { client } from "../..";
import config  from "../../config";

export default async function (): Promise<void> {
  // Schedule a job to run every day at 3 PM
  cron.schedule("* * * * *", async () => {
    if (config.active_role.enabled) {

      const guild: Guild = await client.guilds.fetch(config.guild_id);
      const members = await guild.members.fetch();

      const role = await guild.roles.fetch(config.og_role.member_role_id);

      const roleMember = role?.members.forEach((member) => {
        // @ts-ignore
        const memberJoined = member.joinedTimestamp / 1000
        const timestamp = config.og_role.joined_before
        // @ts-ignore
        if (memberJoined < timestamp) {
          if (!member.roles.cache.has(config.og_role.role_id)) {
            member.roles.add(config.og_role.role_id);
            console.log(` gave ${member.user.tag} og role`);
          }
        }
      });
    }
  });
}
