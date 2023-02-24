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
  ApplicationCommandOption,
} from "discord.js";

import { config } from "../../config";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("plugins")
    .setDescription("shows a list of plugins on the server"),

  async execute(interaction: CommandInteraction) {
    try {
      

      const embed = new EmbedBuilder()
      // @ts-ignore
        .setColor(config.embedColor)
        .setTitle(`${interaction.guild?.name}'s plugins`)
        .setDescription(`${commandsList}`)
        .setThumbnail(client.user?.avatarURL({ forceStatic: false })!);

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({
        content: "This server has 0 commands",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
