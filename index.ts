//dependancy for discordjs
import {
  Client,
  GatewayIntentBits,
  Collection,
  ClientApplication,
  InteractionType,
  Interaction,
  CommandInteraction,
  Partials,
  ButtonInteraction,
  ModalSubmitInteraction,
  SelectMenuInteraction,
} from "discord.js";
import fs, { read, readdirSync } from "fs";
import dotenv, { config } from "dotenv";
import { devConfig } from "./devconfig";
import path from "node:path";
import cron from "node-cron";

import { sftpClient } from "./sftpClient";
import Keyv from "keyv";

export type TaskFunction = () => void;

dotenv.config();
export const client: any = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
  partials: [
    Partials.Channel, // Required to receive DMs
  ],
});

/* 
    The following code below takes all the events in the events folder and put it in an array and filters it by .js files
    The entire thing allows handling events to be as easy as adding it to the events folder and then restarting the bot
*/
const eventPath = path.join(__dirname, "src/events");
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".js"));
// This retrieves the event files and runs them if they should be run once or constantly ↓ this actually runs the event files code
for (const file of eventFiles) {
  const filePath = path.join(eventPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}

// Get the list of task files in the tasks folder
const tasksFolder = path.join(__dirname, "src/tasks");
const taskFiles = fs
  .readdirSync(tasksFolder)
  .filter((file) => file.endsWith(".js"));

taskFiles.forEach((file: string) => {
  // Dynamically import the task module
  const taskModule: { default: TaskFunction } = require(path.join(
    tasksFolder,
    file
  ));

  // Find the exported function and call it to schedule the task
  const taskFunction = taskModule.default;
  if (!taskFunction) return;
  taskFunction();
});

client.commands = new Collection();
// This gets the command modules from the command folders
const cmdPath = path.join(__dirname, "src/commands");
const commandFiles = fs
  .readdirSync(cmdPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(cmdPath, file);
  const command = require(filePath);
  if (command.data) client.commands.set(command.data.name, command);
}

// This executes an Application commands when a player does a Application command
client.on("interactionCreate", async (interaction: CommandInteraction) => {
  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  if (interaction.isChatInputCommand()) {
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }
  } else if (interaction.isContextMenuCommand()) {
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }
  } else if (interaction.isAutocomplete()) {
    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  }
});

client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();

const compPath = path.join(__dirname, "src/components");
const componentFolders = readdirSync(compPath);

for (const folder of componentFolders) {
  const comps = path.join(compPath, folder);
  const componentFiles = readdirSync(comps).filter((file) =>
    file.endsWith(".js")
  );

  switch (folder) {
    case "buttons":
      for (const file of componentFiles) {
        const filePath = path.join(compPath, folder, file);
        const button = require(filePath);

        client.buttons.set(button.data.name, button);
      }
      break;
    case "modals":
      for (const file of componentFiles) {
        const filePath = path.join(compPath, folder, file);
        const modal = require(filePath);
        client.modals.set(modal.data.name, modal);
      }
      break;
    case "selectMenus":
      for (const file of componentFiles) {
        const filePath = path.join(compPath, folder, file);
        const selectmenu = require(filePath);
        client.selectMenus.set(selectmenu.data.name, selectmenu);
      }
      break;
    default:
      break;
  }
}

client.on(
  "interactionCreate",
  async (
    interaction:
      | ButtonInteraction
      | ModalSubmitInteraction
      | SelectMenuInteraction
  ) => {
    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;
      try {
        await button.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while pressing this button!",
          ephemeral: true,
        });
      }
    } else if (interaction.isAnySelectMenu()) {
      const selectMenu = client.selectMenus.get(interaction.customId);
      if (!selectMenu) return;
      try {
        await selectMenu.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while selecting this option!",
          ephemeral: true,
        });
      }
    } else if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;
      try {
        await modal.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while submitting this modal!",
          ephemeral: true,
        });
      }
    }
  }
);

export const sftp = new sftpClient();

sftp.connect({
  host: `${process.env.SFTP_HOST}`,
  port: 2022,
  username: `${process.env.SFTP_USERNAME}`,
  password: `${process.env.SFTP_PASSWORD}`,
})

//This is what logs the bot in
client.login(process.env.TOKEN);
client.on("ready", async () => {
  console.log(
    `The bot is up! Logged in as ${client.user?.tag} at ${client.readyAt}`
  );
});

export const keyv = new Keyv(process.env.SQL)