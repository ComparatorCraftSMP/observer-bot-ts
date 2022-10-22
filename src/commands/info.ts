import fetch from "cross-fetch";
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
import fetchPlaceholder from "../utils/fetchPlaceholder";
const wait = require("node:timers/promises").setTimeout;

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
          try {
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

            const guildEmbed = new EmbedBuilder()
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

            await interaction.reply({ embeds: [guildEmbed] });
            await wait(1);
            await interaction.editReply({ embeds: [guildEmbed] });
          } catch (error) {
            await interaction.reply({
              content: "This guild isn't available",
              ephemeral: true,
            });
            console.error(error);
          }
          break;
        case "member":
          const user = interaction.options.getUser("member");

          const gld = interaction.guild;
          const member = await gld?.members.fetch(`${user?.id}`);

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
            .setColor(member?.displayHexColor)
            .setTitle(`Information about ${member?.displayName}`)
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
                name: `<:icons_clock:964491800465276940> Joined ${gld?.name}`,
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
          try {
            await interaction.reply({ embeds: [memberEmbed] });
            await interaction.editReply({ embeds: [memberEmbed] });
          } catch (error) {
            await interaction.reply({
              content: "There was an error",
              ephemeral: true,
            });
            console.error(error);
          }
          break;
        case "server":
          try {
            const serverReq = await fetch(`${process.env.SERVER}/v1/server`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                key: `${process.env.API}`,
              },
            });
            const serverData = await serverReq.json();

            const planOverviewReq = await fetch(
              `${config.plan.url}/v1/serverOverview?server=${config.plan.server}`,
              { method: "GET" }
            );
            const planOverviewData = await planOverviewReq.json();

            const serverEmbed = new EmbedBuilder()
              // @ts-ignore
              .setColor(config.embedColor)
              .setTitle(`Information about the Minecraft Server`)
              .setThumbnail(
                `https://eu.mc-api.net/v3/server/favicon/${config.ip}`
              )
              .addFields(
                {
                  name: "<:icons_people:964425853930995783> Players Online",
                  value: `${await fetchPlaceholder(
                    "8b005697-0c91-42bd-b404-9e065e08fbb8",
                    "%server_online%/%server_max_players%"
                  )}`,
                  inline: true,
                },
                {
                  name: "<:icons_box:869507189298040833> Software",
                  value: `${serverData.name}`,
                  inline: true,
                },
                {
                  name: "<:icons_channel:859424401950113822> Version",
                  value: `${serverData.version}`,
                  inline: true,
                },
                {
                  name: "<:icons_goodping:880113406915538995> TPS",
                  value: `${serverData.tps}`,
                  inline: true,
                },
                {
                  name: "<:icons_globe:859424401971609600> Total Chunks",
                  value: `${await fetchPlaceholder(
                    "8b005697-0c91-42bd-b404-9e065e08fbb8",
                    "%server_total_chunks%"
                  )}`,
                  inline: true,
                },
                {
                  name: "<:icons_bulb:882595243579559958> Uptime",
                  value: `${planOverviewData.numbers.current_uptime}`,
                  inline: true,
                },
                {
                  name: "<:icons_swardx:866599435214389258> Total Player Kills",
                  value: `${planOverviewData.numbers.player_kills}`,
                  inline: true,
                },
                {
                  name: "<:icons_kick:859424400557604886> Total Player Deaths",
                  value: `${planOverviewData.numbers.deaths}`,
                  inline: true,
                },
                {
                  name: "<:icons_clock:964491800465276940> Total Playtime",
                  value: `${planOverviewData.numbers.playtime}`,
                  inline: true,
                }
              );
            await interaction.reply({ embeds: [serverEmbed] });
            await interaction.editReply({ embeds: [serverEmbed] });
          } catch (error) {
            await interaction.reply({
              content: "The server isn't up",
              ephemeral: true,
            });
            console.error(error);
          }
          break;
        case "player":
          const username = interaction.options.getString("username");

          const options = {
            method: "GET",
          };

          const playerQuery = await fetch(
            `https://plan.comparatorcraftsmp.net/v1/player?player=${username}`,
            options
          );

          const playerInfo = await playerQuery.json();
          
          if (playerInfo.error) {
            await interaction.reply("This player hasn't joined the Minecraft server")
          }

          const playerUUID: string = playerInfo.info.uuid;

          const statusOnline: boolean = await playerInfo.info.online

          const online = new EmbedBuilder()
            .setAuthor({ name: `${}` })
            // @ts-ignore
            .setColor(config.embedColor)
            .setTitle(`Minecraft Information about ${username}`)
            .setThumbnail(`https://minotar.net/helm/${username}/100.png`)
            .addFields(
              {
                name: "Minecraft Username",
                value: `${username}`,
                inline: true,
              },
              {
                name: "Discord Username",
                value: `${await fetchPlaceholder(
                  playerUUID,
                  "%discordsrv_user_tag%"
                )}`,
                inline: true,
              },
              {
                name: "First Join",
                value: `<t:${Math.round(
                  // @ts-ignore
                  parseInt(
                    await fetchPlaceholder(
                      `${playerUUID}`,
                      "%player_first_played%"
                    )
                  ) / 1000
                )}:F>, or <t:${Math.round(
                  // @ts-ignore
                  parseInt(
                    await fetchPlaceholder(
                      `${playerUUID}`,
                      "%player_first_played%"
                    )
                  ) / 1000
                )}:R>`,
                inline: true,
              },
              {
                name: "Last Join",
                value: `<t:${Math.round(
                  // @ts-ignore
                  parseInt(
                    await fetchPlaceholder(
                      `${playerUUID}`,
                      "%player_last_join%"
                    )
                  ) / 1000
                )}:F>, or <t:${Math.round(
                  // @ts-ignore
                  parseInt(
                    await fetchPlaceholder(
                      `${playerUUID}`,
                      "%player_last_join%"
                    )
                  ) / 1000
                )}:R>`,
                inline: true,
              },
              {
                name: "Location",
                value: `**X:** ${await fetchPlaceholder(
                  `${playerUUID}`,
                  "%player_x%"
                )} **Y:** ${await fetchPlaceholder(
                  `${playerUUID}`,
                  "%player_y%"
                )} **Z:** ${await fetchPlaceholder(
                  `${playerUUID}`,
                  "%player_z%"
                )} \n **World:** ${await fetchPlaceholder(
                  `${playerUUID}`,
                  "%player_world%"
                )}`,
                inline: true,
              }
            );

          

          const replyEmbed = statusOnline === false ? offline : online;
          try {
            await interaction.reply({ embeds: [replyEmbed] });
          } catch (error) {
            await interaction.reply("This player hasnt joined the mc server");
            console.error(error);
          }
          break;
        case "mc_user":
      }
    } catch (error) {
      console.error(error);
    }
  },
};
