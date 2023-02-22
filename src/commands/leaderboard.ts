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
import { config } from "../../config";

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

      const leaderboard = data.scores.sort(
        (a: any, b: any) => b.value - a.value
      );

      let userIGN = "";
      userIGN = Object.values(leaderboard)
        .map((ign: any) => ign.entry)
        .join("\n");
      let score = "";
      score = Object.values(leaderboard)
        .map((score: any) => score.value)
        .join("\n");

      

      const pages = [];

      for (let i = 0; i < leaderboard.length; i += 10) {
        const page = leaderboard.slice(i, i + 10);
        pages.push(page);
      }

      const embeds = [];
      for (let i = 0; i < pages.length; i++) {
        const embed = new EmbedBuilder()
          .setTitle("Scores")
          .setDescription(pages[i].join("\n"))
          .setFooter(`Page ${i + 1} of ${pages.length}`);
        embeds.push(embed);
      }

      /* 
      const embed = new EmbedBuilder()
        // @ts-ignore
        .setColor(`${config.embedColor}`)
        .setTitle(`Statistic Name`)
        .setDescription(`Top 15 people in ${statName}`)
        .addFields(
          {
            name: "Rank",
            value:
              "`#1\n#2\n#3\n#4\n#5\n#6\n#7\n#8\n#9\n#10\n#11\n#12\n#13\n#14\n#15`",
            inline: true,
          },
          {
            name: "Player",
            value: `\`${userIGN}\``,
            inline: true,
          },
          {
            name: "Value",
            value: `\`${score}\``,
            inline: true,
          }
        );

      await interaction.reply({ embeds: [embed] }); */

      await interaction.reply({
        content: "this command is in development",
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
