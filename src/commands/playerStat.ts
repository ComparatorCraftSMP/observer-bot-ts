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
    .setName("player_stat")
    .setDescription("Statistic of a specific player on the server"),

  async execute(interaction: CommandInteraction) {
    try {
      //code here

      const embed = new EmbedBuilder()
        .setColor(`#6bde36`)
        .setTitle(`Title Here`)
        .setThumbnail(interaction.user?.avatarURL({ forceStatic: false })!)
        .setURL("https://analog-ts.bossdaily.me/")
        .setAuthor({
          name: "Some name",
          iconURL: "https://avatars.githubusercontent.com/u/110413696?s=200&v=4",
          url: "https://analog-ts.bossdaily.me/",
        })
        .setDescription("Some description here")
        .addFields(
          { name: "Regular field title", value: "Some value here" },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Inline field title",
            value: "Some value here",
            inline: true,
          },
          { name: "Inline field title", value: "Some value here", inline: true }
        )
        .addFields({
          name: "Inline field title",
          value: "Some value here",
          inline: true,
        })
        .setImage("https://avatars.githubusercontent.com/u/110413696?s=200&v=4")
        .setTimestamp()
        .setFooter({
          text: "Some footer text here",
          iconURL: "https://avatars.githubusercontent.com/u/110413696?s=200&v=4",
        });

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