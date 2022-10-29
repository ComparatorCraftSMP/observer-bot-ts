import {
  Interaction,
  EmbedBuilder,
  CommandInteractionOptionResolver,
  Message,
  CommandInteraction,
  ApplicationCommand,
  SlashCommandBuilder,
  SlashCommandStringOption,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalActionRowComponent,
  ModalActionRowComponentBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { config } from "../../config";

import { client } from "../../index";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dmarker")
    .setDescription("Put Description here")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adds a dynmap marker to the map")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the dynmap marker")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("Category of the dynmap marker")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("icon")
            .setDescription("The icon the dynmap marker will use")
            .setRequired(false)
        )
        .addIntegerOption((option) =>
          option
            .setName("x")
            .setDescription("x coordinate of the dynmap marker")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("y")
            .setDescription("y coordinate of the dynmap marker")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("z")
            .setDescription("z coordinate of the dynmap marker")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("dimension")
            .setDescription("Dimension the dynmap marker will be in")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Deletes a dynmap marker off the map")
        .addStringOption((option) =>
          option
            .setName("label")
            .setDescription("Put the dynmap marker's label or id here")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list_categories")
        .setDescription("This shows a list of all dynmap marker categories")
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      switch (interaction.options.getSubcommand()) {
        case "add":
          try {
            const options = {
              body: `command=dmarker%20add%20set%3A${interaction.options.getString(
                "category"
              )}%20label%3A%22${interaction.options.getString(
                "name"
              )}%22%20x%3A${interaction.options.getInteger(
                "x"
              )}%20y%3A${interaction.options.getInteger(
                "y"
              )}%20z%3A${interaction.options.getInteger(
                "z"
              )}%20icon%3A${interaction.options.getString(
                "icon"
              )}%20world%3A${interaction.options.getString("dimension")}`,
              method: "POST",
              headers: {
                accept: "*/*",
                key: `${process.env.API}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            };

            const response = await fetch(
              `${process.env.SERVER}/v1/server/exec`,
              options
            );
            //const data = await response.json()

            const embed = new EmbedBuilder()
            // @ts-ignore
              .setColor(config.embedColor)
              .setTitle(`Added dynmap marker`)
              .setDescription(
                `View your marker here: https://map.comparatorcraftsmp.net/#${interaction.options.getString(
                  "dimension"
                )};flat;${interaction.options.getInteger(
                  "x"
                )},64,${interaction.options.getInteger("z")};7`
              );

            await interaction.reply({ embeds: [embed] });
          } catch (error) {
            console.error(error);
          }
          break;
        case "delete":
          break;
        case "list_categories":
          break;
      }
    } catch (error) {
      await interaction.reply({
        content: "command failed to send",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
