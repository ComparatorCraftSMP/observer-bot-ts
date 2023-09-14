import { Guild, WebhookClient } from "discord.js";
import cron from "node-cron";
import fetch from "cross-fetch";
import { client } from "../..";
import config from "../../config";

export default async function (): Promise<void> {
  // Schedule a job to run every day at 3 PM
  cron.schedule("16 26 * * SAT", async () => {
    if (config.reddit) {
      const fetchPosts = await fetch(
        `https://www.reddit.com/user/${config.reddit}.json`
      );
      const posts = await fetchPosts.json();
      const latestPost = posts.data.children[0].name.replace("t3_", "");

      const webhookClient = new WebhookClient({
        url: `${process.env.REDDIT_WEBHOOK}`,
      });

      await webhookClient.send(
        `# Want to help make the server active?\n
        Support such as comments and awards on our reddit advertisement will help us keep the server active by ensuring we're attracting new members to the SMP.\n
        https://www.reddit.com/${latestPost}\n
        We have a new post and we would appreciate support (your gift to us) with an honest review and an award.\n
        This is one of the best ways of supporting us, this ensures the server never dies or goes in active since we're constantly getting a new flow of talented people to play on our server. r/mcservers gives us the most "high quality" and "less likely to cause trouble" types of players out of every other platform.\n
        ||@everyone<@&762451328793706496> ||`
      )
    }
  });
}
