import { SlashCommandBuilder } from "@discordjs/builders";
import { REST, Routes } from "discord.js";
import config from "../../config";
import dotenv from "dotenv";

dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

rest
  .put(Routes.applicationGuildCommands(config.clientId, config.guild_id), {
    body: [],
  })
  .then(() => console.log(`Successfully deleted all application commands.`))
  .catch(console.error);