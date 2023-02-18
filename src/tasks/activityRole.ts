
import { Guild } from 'discord.js';
import cron from 'node-cron';
import fetch from 'node-fetch';
import { client } from '../..';



export default async function(): Promise<void> {
  // Schedule a job to run every day at 3 PM
  cron.schedule('* * * * *', async () => {
    const guild: Guild = await client.guilds.fetch('761670547196739635')

    const roles = guild.roles.fetch('1076582329243406347')
    console.log(roles)

    console.log('Task 2 is running');
  });
};