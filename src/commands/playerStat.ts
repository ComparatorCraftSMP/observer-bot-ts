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
} from "discord.js";
import { config } from "../../config";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("player_stat")
    .setDescription("Statistic of a specific player on the server")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Username of the player")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("stat")
        .setDescription("The stat you want")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction: AutocompleteInteraction) {
    let choices;

    const options = {
      method: 'GET',
      headers: {Accept: 'application/json', 'key': `${process.env.API}`}
    }

  const response = await fetch(`${process.env.SERVER}/v1/scoreboard`, options)
  },

  async execute(interaction: CommandInteraction) {
    try {
      //code here

      const embed = new EmbedBuilder()
      // @ts-ignore
        .setColor(`${config.embedColor}`)
        .setTitle(`Title Here`)
        .setThumbnail(interaction.user?.avatarURL({ forceStatic: false })!)
        .setURL("https://analog-ts.bossdaily.me/")
        .setAuthor({
          name: "Some name",
          iconURL:
            "https://avatars.githubusercontent.com/u/110413696?s=200&v=4",
          url: "https://analog-ts.bossdaily.me/",
        })
        .setDescription("Some description here");

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({
        content: "There was an error executing this command",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
