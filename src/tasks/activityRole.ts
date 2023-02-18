
import cron from 'node-cron';
import fetch from 'node-fetch';
import { client } from '../..';



export default function(): void {
  // Schedule a job to run every day at 3 PM
  cron.schedule('* * * * *', () => {
    const guild = client.guilds.fetch('761670547196739635')
    console.log(guild)

    console.log('Task 2 is running');
  });
};