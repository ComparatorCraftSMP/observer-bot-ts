import { SlashCommandBuilder } from "@discordjs/builders";
import { REST, Routes } from "discord.js";
import { client } from "../index";
import configg from "../config";
import dotenv, { config } from "dotenv";

dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

rest
  .put(Routes.applicationGuildCommands(configg.clientId, configg.guild_id), {
    body: [],
  })
  .then(() => console.log(`Successfully deleted all application commands.`))
  .catch(console.error);
