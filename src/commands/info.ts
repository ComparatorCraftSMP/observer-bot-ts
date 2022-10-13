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
  ChatInputCommandInteraction,
} from "discord.js";
import { client } from "../..";

import { config } from "../../config";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get information about the discord and minecraft server.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("guild")
        .setDescription("Information about the Discord server/guild.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("member")
        .setDescription(
          "Information about a member on the Discord server/guild."
        )
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription(
              "The member of the Discord server you want info about."
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Information about the Minecraft server.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("player")
        .setDescription(
          "The player on the Minecraft server you want info about."
        )
        .addStringOption((option) =>
          option
            .setName("username")
            .setDescription("The username of the player you want info about")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mc_user")
        .setDescription("Information about an user on minecraft")
        .addStringOption((option) =>
          option
            .setName("username")
            .setDescription(
              "Username or UUID of the minecraft player you want information about"
            )
            .setRequired(true)
        )
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      // code here
      switch (interaction.options.getSubcommand()) {
        case "guild":
          const client = interaction.client;

          const guild = await interaction.guild?.fetch();

          const command = await client.application.commands.fetch();

          const channel = await guild?.channels.fetch();
          const channelCount = channel?.size;

          const roles = await guild?.roles.fetch();
          const roleCount = roles?.size;

          const matchUnderscore = /(_)/g;

          const feature = guild?.features
            .map(
              (fe) =>
                `<:icons_Correct:859388130411282442> ${fe
                  .replace(matchUnderscore, " ")
                  .toLowerCase()
                  .replace(/(^|\s)\S/g, (L) => L.toUpperCase())}`
            )
            .join("\n");

          const embed = new EmbedBuilder()
            // @ts-ignore
            .setColor(config.embedColor)
            .setTitle(`Information about ${guild?.name}`)
            .addFields(
              {
                name: "<:icons_shine1:859424400959602718> Owner",
                value: `<@${guild?.ownerId}>`,
                inline: true,
              },
              {
                name: "<:icons_people:964425853930995783> Members",
                value: `Member Count: ${guild?.memberCount}`,
                inline: true,
              },
              {
                name: "<:icons_calendar1:941679946760351794> Date Created",
                value: `<t:${Math.round(
                  // @ts-ignore
                  guild?.createdAt / 1000
                  // @ts-ignore
                )}:F> or <t:${Math.round(guild.createdAt / 1000)}:R>`,
                inline: true,
              },
              {
                name: "<:icons_calendar1:941679946760351794> Bot Join Date",
                value: `<t:${Math.round(
                  // @ts-ignore
                  guild.joinedTimestamp / 1000
                  // @ts-ignore
                )}:F> or <t:${Math.round(guild.joinedTimestamp / 1000)}:R>`,
                inline: true,
              },
              {
                name: "<:icons_pen:869507189553922061> Commands (from this bot)",
                value: `${command.size}`,
                inline: true,
              },
              {
                name: "<:icons_channel:859424401950113822> Channels",
                value: `${channelCount}`,
                inline: true,
              },
              {
                name: "<:icons_colorstaff:869554761840603196> Affiliation",
                // @ts-ignore
                value: `<:icons_colorserverpartner:869529747447746600> Partnered: ${guild?.partnered}\n<:icons_colorserververified:869529747846234162> Verified: ${guild.verified}`,
                inline: true,
              },
              {
                name: "<:icons_dblurple:875710295258046535> Roles",
                value: `${roleCount}`,
                inline: true,
              },
              {
                name: "<:icons_colorboostnitro:869528229436858378> Boosting",
                value: `Shows Progress Bar: ${
                  guild?.premiumProgressBarEnabled
                }\nBoosting Tier: ${guild?.premiumTier
                  .toString()
                  .replace(matchUnderscore, " ")
                  .toLowerCase()
                  .replace(/(^|\s)\S/g, (L: any) =>
                    L.toUpperCase()
                  )}\nTotal Boost Count: ${guild?.premiumSubscriptionCount}`,
                inline: true,
              },
              {
                name: "<:icons_linked:875395222962585660> Features",
                value: `${feature}`,
              }
            )
            .setThumbnail(client.user.avatarURL({ forceStatic: false })!);
          const wait = require("node:timers/promises").setTimeout;
          await interaction.reply({ embeds: [embed] });
          await wait(1);
          await interaction.editReply({ embeds: [embed] });
          break;
        case "member":
          const user = interaction.options.getUser("user");

          const gld = interaction.guild;
          const member = await gld?.members.fetch(user!);

          const memberRoles = member?.roles.cache;
          const memberRoleCount = memberRoles?.size;
          const rolesList = memberRoles
            ?.map((role: any) => `<@&${role.id}>`)
            .join(", ");

          const undRemove = /(_)/g;

          const flag = await user?.fetchFlags();
          const flagList = flag
            ?.toArray()
            .map(
              (fe) =>
                `<:icons_Correct:859388130411282442> ${fe
                  .replace(undRemove, " ")
                  .toLowerCase()
                  .replace(/(^|\s)\S/g, (L) => L.toUpperCase())}`
            )
            .join("\n");

          const memberEmbed = new EmbedBuilder()
            // @ts-ignore
            .setColor(config.embedColor)
            .setTitle(`Information about ${member?.pending}`)
            .addFields(
              {
                name: "<:icons_calendar1:941679946760351794> Joined Discord",
                value: `<t:${Math.round(
                  // @ts-ignore
                  user.createdTimestamp / 1000
                  // @ts-ignore
                )}:F> or <t:${Math.round(user.createdTimestamp / 1000)}:R>`,
                inline: true,
              },
              {
                name: `<:icons_clock:964491800465276940> Joined ${gld.name}`,
                value: `<t:${Math.round(
                  // @ts-ignore
                  member.joinedTimestamp / 1000
                  // @ts-ignore
                )}:F> or <t:${Math.round(member.joinedTimestamp / 1000)}:R>`,
                inline: true,
              },
              {
                name: "<:icons_dfuchsia:875710295081910292> Roles",
                value: `${rolesList}`,
                inline: true,
              },
              {
                name: "<:icons_eventcolour:870646213429563445> Badges",
                value: `${flagList ? flagList : "None"}`,
                inline: true,
              }
            )
            .setThumbnail(user?.avatarURL({ forceStatic: false })!);

          await interaction.reply({ embeds: [memberEmbed] });
      }
    } catch (error) {
      await interaction.reply({
        content: "There was an error",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
