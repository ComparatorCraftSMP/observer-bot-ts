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
} from "discord.js";

import { client } from "../../index";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dmarker")
    .setDescription("Put Description here")
    .addStringOption((option) =>
      option
        .setName("exampleName")
        .setDescription(
          "Put either their uuid or minecraft username in this field."
        )
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const exampleName = interaction.options.getString("exampleName");

    try {
      await interaction.reply(`exampleName`);
    } catch (error) {
      await interaction.reply({
        content: "command failed to send",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};

