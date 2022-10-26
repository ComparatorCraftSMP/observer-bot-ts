import {
  Interaction,
  EmbedBuilder,
  CommandInteractionOptionResolver,
  Message,
  CommandInteraction,
  ApplicationCommand,
  SlashCommandBuilder,
  SlashCommandStringOption,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalActionRowComponent,
  ModalActionRowComponentBuilder,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from "discord.js";

import { client } from "../../index";


module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Accept Application")
    .setType(ApplicationCommandType.Message),

  async execute(interaction: ContextMenuCommandInteraction) {
    try {
      await interaction.reply("Hello user");
    } catch (error) {
      await interaction.reply({
        content: "This Context Menu Failed",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
