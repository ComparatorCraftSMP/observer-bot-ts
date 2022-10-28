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
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adds a dynmap marker to the map")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the dynmap marker")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("Category of the dynmap marker")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("icon")
            .setDescription("The icon the dynmap marker will use")
            .setRequired(false)
        )
        .addIntegerOption((option) =>
          option
            .setName("x")
            .setDescription("x coordinate of the dynmap marker")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("y")
            .setDescription("y coordinate of the dynmap marker")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("z")
            .setDescription("z coordinate of the dynmap marker")
            .setRequired(true)
        )
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
