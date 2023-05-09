import { Guild } from "discord.js";
import cron from "node-cron";
import fetch from "cross-fetch";
import { client, keyv } from "../..";
import config from "../../config";

const arraysEqual = (a: any[], b: any[]) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  
  const aSorted = a.slice().sort();
  const bSorted = b.slice().sort();

  for (let i = 0; i < aSorted.length; ++i) {
    if (aSorted[i] !== bSorted[i]) return false;
  }
  return true;
};

const getNewFeatures = (oldFeatures: any[], newFeatures: any[]) => {
  return newFeatures.filter((feature) => !oldFeatures.includes(feature));
};

export default async function (): Promise<void> {
  // Schedule a job to run every day at 3 PM
  cron.schedule("* * * * *", async () => {
    const guild: Guild = await client.guilds.fetch(config.guild_id);
    let initialFeatures = [
      "CREATOR_MONETIZABLE_PROVISIONAL",
      "TEXT_IN_VOICE_ENABLED",
      "THREE_DAY_THREAD_ARCHIVE",
      "COMMUNITY",
      "THREADS_ENABLED",
      "ANIMATED_ICON",
      "AUTO_MODERATION",
      "NEW_THREAD_PERMISSIONS",
      "MEMBER_VERIFICATION_GATE_ENABLED",
      "PREVIEW_ENABLED",
      "NEWS",
      "INVITE_SPLASH",
    ];

    if (!(await keyv.has("features"))) {
      await keyv
        .set("features", initialFeatures)
        .then(() => console.log("Initial features array stored successfully"))
        .catch((err) =>
          console.error(`Error storing initial features array: ${err}`)
        );
    }

    const guildFeatures = guild.features;
    const storedFeatures = await keyv.get("features");

    if (!arraysEqual(storedFeatures, guildFeatures)) {
      await keyv.set("features", guildFeatures);
      const newFeatures = getNewFeatures(storedFeatures, guildFeatures);
      await client.users.send(
        "274973338676494347",
        `You just got access to ${newFeatures}!!!`
      );
    }
  });
}
