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
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get information about the discord and minecraft server.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("guild")
        .setDescription("Information about the Discord server/guild.")
    ),

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
