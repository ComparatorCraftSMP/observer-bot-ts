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
  Embed,
} from "discord.js";
import fetch from "cross-fetch";
import config  from "../../config";
import { Pagination } from "pagination.djs";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Leaderboard of players in a certain stat")
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

    const req = await fetch(`${process.env.SERVER}/v1/scoreboard`, {
      method: "GET",
      headers: { Accept: "application/json", key: `${process.env.API}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const objectives = res.objectives;

        if (focusedOption.name === "stat") {
          choices = objectives;

          const filtered = choices.filter((choice: string) =>
            choice.toLowerCase().includes(focusedOption.value.toLowerCase())
          );

          const intRes = filtered.map((choice: string) => ({
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
      // @ts-ignore
      const pagination = new Pagination(interaction);
      //code here
      const stat = interaction.options.getString("stat");
      const statRe = /^[^_]+_/g;
      const statName = stat?.replace(statRe, "");

      const options = {
        method: "GET",
        headers: { Accept: "application/json", key: `${process.env.API}` },
      };

      const response = await fetch(
        `${process.env.SERVER}/v1/scoreboard/${stat}`,
        options
      );
      const data = await response.json();

      const scoreboard = data.scores.sort(
        (a: any, b: any) => b.value - a.value
      );

      let leaderboard: any[] = [];

      scoreboard.forEach((score: any) =>
        leaderboard.push({
          entry: score.entry,
          value: score.value.toLocaleString(),
          index: scoreboard.findIndex((s: any) => s.entry === score.entry) + 1,
        })
      );

      const perPage = 15;

      const pages = [];

      for (let i = 0; i < leaderboard.length; i += perPage) {
        const page = leaderboard.slice(i, i + perPage);
        const userIGN = Object.values(page)
          .map((ign: any) => ign.entry)
          .join("\n");
        const score = Object.values(page)
          .map((score: any) => score.value)
          .join("\n");
        const number = Object.values(page)
          .map((score: any) => score.index)
          .join("\n");
        pages.push({ igns: userIGN, scores: score, numbers: number });
      }

      const embeds = [];
      for (let i = 0; i < pages.length; i++) {
        const embed = new EmbedBuilder()
          .setTitle(`Top ${leaderboard.length} people in ${statName}`)
          .addFields([
            {
              name: "Rank",
              value: `${pages[i].numbers}`,
              inline: true,
            },
            {
              name: "Player",
              value: `${pages[i].igns}`,
              inline: true,
            },
            {
              name: "Value",
              value: `${pages[i].scores}`,
              inline: true,
            },
          ])
          .setFooter({ text: `Page ${i + 1} of ${pages.length}` })
          // @ts-ignore
          .setColor(`${config.embedColor}`);
        embeds.push(embed);
      }
      pagination.setEmbeds(embeds);
      pagination.render();
    } catch (error) {
      await interaction.reply({
        content: "There was an error executing this command",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
