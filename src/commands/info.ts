import {
  Interaction,
  EmbedBuilder,
  CommandInteractionOptionResolver,
  Message,
  CommandInteraction,
  ApplicationCommand,
  SlashCommandBuilder,
  SlashCommandStringOption,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("info").setDescription("information"),

  async execute(interaction: CommandInteraction) {
    try {
      // code here
      await interaction.reply("pong");
    } catch (error) {
      await interaction.reply({
        content: "There was an error",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
