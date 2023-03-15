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
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from "discord.js";
import fetch from "cross-fetch";
import config  from "../../config";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transcript")
    .setDescription("creates an html file which is a transcription of a discord channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want transcripted")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      //code here
      const channel = interaction.options.getChannel("channel") ? interaction.options.getChannel("channel") : interaction.channel
      const guild = await interaction.guild?.fetch()
      const guildChannel = guild?.channels.fetch(config.transcript.archive_channel_id)
      
      
      
    } catch (error) {
      await interaction.reply({
        content: "There was an error executing this command",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
