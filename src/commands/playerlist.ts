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
    .setName("playerlist")
    .setDescription("Shows a list of players on the server"),

  async execute(interaction: CommandInteraction) {
    try {
      const options = {
        method: "GET",
        headers: { Accept: "application/json", key: `${process.env.API}` },
      };

      const response = await fetch(`${process.env.SERVER}/v1/plugins`, options);
      const data = await response.json();
      let pluginString = "";
      pluginString = Object.values(data)
        .map((plugin: any) => {
          if(plugin.website) {
            return `[${plugin.name}](${plugin.website})`;
          } else {
            return plugin.name;
          }
        })
        .join(", ");

      const embed = new EmbedBuilder()
        // @ts-ignore
        .setColor(config.embedColor)
        .setTitle(`${interaction.guild?.name}'s plugins`)
        .setDescription(`${pluginString}`)
        // @ts-ignore
        .setThumbnail(interaction.guild?.iconURL())
        .setFooter({ text: `${interaction.guild?.name} has ${data.length} plugins`});

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
