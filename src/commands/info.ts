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
  ChatInputCommandInteraction,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get information about the discord and minecraft server.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("guild")
        .setDescription("Information about the Discord server/guild.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("member")
        .setDescription(
          "Information about a member on the Discord server/guild."
        )
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription(
              "The member of the Discord server you want info about."
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Information about the Minecraft server.")
    ).addSubcommand(subcommand =>
      subcommand
        .setName('player')
        .setDescription('description')
        .addStringOption((option) =>
              option
                .setName("username")
                .setDescription(
                  "The username of the player you want info about"
                )
                .setRequired(true)
            )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('mc_user')
        .setDescription('Information about an user on minecraft')
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      // code here
      
    } catch (error) {
      await interaction.reply({
        content: "There was an error",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};