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
} from "discord.js";
import fetch from "cross-fetch";
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
    const focusedOption = interaction.options.getFocused(true);
    let choices;

    const options = {
      method: "GET",
      headers: { Accept: "application/json", key: `${process.env.API}` },
    };

    const req = await fetch(`${process.env.SERVER}/v1/scoreboard`, options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const usernames = res.entries;
        const objectives = res.objectives;

        if (focusedOption.name === "username") {
          choices = usernames;

          const regexUUID = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g;
          const regexHashTag = /#\w+/g;

          const filterUUID = choices.filter(
            (choice) => !regexUUID.test(choice)
          );

          const filterHashTag = filterUUID.filter(
            (choice) => !regexHashTag.test(choice)
          );

          const filteredTwo = filterHashTag.filter((choice) =>
            choice.includes(focusedOption.value)
          );

          interaction.respond(
            filteredTwo
              .map((choice) => ({
                name: choice,
                value: choice,
              }))
              .slice(0, 25)
          );
        }

        if (focusedOption.name === "stat") {
          choices = objectives;

          const filtered = choices.filter((choice) =>
            choice.includes(focusedOption.value)
          );

          const intRes = filtered.map((choice) => ({
            name: choice.replace(/^[^_]+_/g, ""),
            value: choice,
          }));

          interaction.respond(intRes.slice(0, 25));
        }
      });

    /* const res = await req.json() */
  },

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      //code here
      const username = interaction.options.getString("username");
      const stat = interaction.options.getString("stat");

      const options = {
        method: "GET",
        headers: { Accept: "application/json", key: `${process.env.API}` },
      };

      const response = await fetch(
        `${process.env.SERVER}/v1/scoreboard/${stat}`,
        options
      );
      const data = await response.json();
      let statObj = data.scores.find((x) => x.entry === username);
      let statObjs = statObj.value
      if (statObjs === undefined){
        statObjs = 0
      }

      console.log(statObj)

      const statRe = /^[^_]+_/g;
      const statName = stat?.replace(statRe, "");

      const embed = new EmbedBuilder()
        // @ts-ignore
        .setColor(`${config.embedColor}`)
        .setTitle(`Player stats of ${username}`)
        .setThumbnail(`https://minotar.net/armor/bust/${username}/100.png`)
        .setDescription(`${statName}: ${statObjs}`);

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      await interaction.reply({
        content: "There was an error executing this command",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
