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
      const guild = interaction.guild;
      const cmdUser = await guild?.members.fetch(
        `${interaction?.member?.user.id}`
      );
      switch (interaction.options.getSubcommand()) {
        case "add":
          const name = interaction.options.getString("name");
          const category = interaction.options.getString("category");
          const icon = interaction.options.getString("icon");
          const x = interaction.options.getInteger("x");
          const y = interaction.options.getInteger("y");
          const z = interaction.options.getInteger("z");
          const dimension = interaction.options.getString("dimension");
          try {
            if (
              cmdUser?.permissions.has(
                config.dynmap.cmdPerms.addMarker.permissions
              ) ||
              cmdUser?.roles.cache.hasAny(
                config.dynmap.cmdPerms.addMarker.role_ids
              )
            ) {
              const addOptions = {
                body: `command=dmarker%20add%20set%3A${category}%20label%3A%22${name}%22%20x%3A${x}%20y%3A${y}%20z%3A${z}%20icon%3A${icon}%20world%3A${dimension}`,
                method: "POST",
                headers: {
                  accept: "*/*",
                  key: `${process.env.API}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              };

              const addDmarker = await fetch(
                `${process.env.SERVER}/v1/server/exec`,
                addOptions
              );
            }
            //const data = await response.json()

            const addDmarkerEmbed = new EmbedBuilder()
              // @ts-ignore
              .setColor(config.embedColor)
              .setTitle(`Added dynmap marker`)
              .setDescription(
                `View your marker here: https://map.comparatorcraftsmp.net/#${dimension};flat;${x},64,${z};7`
              );

            await interaction.reply({ embeds: [addDmarkerEmbed] });
          } catch (error) {
            console.error(error);
            await interaction.reply({
              content: "Could not add dynmap marker.",
              ephemeral: true,
            });
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
