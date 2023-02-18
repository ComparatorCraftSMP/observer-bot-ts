
import cron from 'node-cron';
import fetch from 'node-fetch';
import { client } from '../..';



export default async function(): Promise<void> {
  // Schedule a job to run every day at 3 PM
  cron.schedule('* * * * *', async () => {
    const guild = await client.guilds.fetch('761670547196739635')
    console.log(guild)

    console.log('Task 2 is running');
  });
};