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

import config  from "../../config";
import fetchPlaceholder from "../utils/fetchPlaceholder";

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

      const playerRes = await fetch(`${process.env.SERVER}/v1/players`, options);
      const playerData = await playerRes.json();

      const serverRes = await fetch(`${process.env.SERVER}/v1/server`, options);
      const serverData = await serverRes.json();

      let playerString = "";
      playerString = Object.values(playerData)
        .map((player: any) => {
          return player.displayName
        })
        .join(", ");

      const embed = new EmbedBuilder()
        // @ts-ignore
        .setColor(config.embedColor)
        .setTitle(`${interaction.guild?.name}'s playerlist`)
        .setDescription(`${await fetchPlaceholder('0e4735e7-b910-480e-9566-e83d960c978d', '%playerlist_online,normal,yes,list%')}`)
        // @ts-ignore
        .setThumbnail(interaction.guild?.iconURL())
        .setFooter({ text: `${serverData.onlinePlayers}/${serverData.maxPlayers} players online`});

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
