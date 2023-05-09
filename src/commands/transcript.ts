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
  PermissionFlagsBits,
  ChannelType,
} from "discord.js";
import fetch from "cross-fetch";
import config from "../../config";


import { sftp } from "../..";

import discordTranscripts from "discord-html-transcripts";
import fs, { fstat } from "node:fs";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transcript")
    .setDescription(
      "creates an html file which is a transcription of a discord channel"
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want transcripted")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      //code here
      const channel = interaction.options.getChannel("channel")
        ? interaction.options.getChannel("channel")
        : interaction.channel;
      const guild = await interaction.guild?.fetch();
      const guildChannel = await guild?.channels.fetch(
        config.transcript.archive_channel_id
      );

      

      
      const ticketList = await sftp.ls("public/tickets");

      await interaction.reply({
        content: "<a:Prints_dark:1085662565541085314> Checking if the transcript already exists",
      });

      if (
        ticketList.some((e) => e.filename === `transcript-${channel?.id}.html`)
      ) {
        await interaction
          .editReply({
            // ephemeral: true,
            content: `That channel was already archived! \n [Here is the link](https://download.comparatorcraftsmp.net/tickets/transcript-${channel?.id}.html)`,
          })
          //     .then(() => sftp.end())
          .catch((error) => {
            console.error(error);
          });
      } else {
        if (channel?.type === ChannelType.GuildText) {
          await interaction.editReply({
            content: "<a:Prints_dark:1085662565541085314> Transcript doesn't exist, creating one",
          });
          const attachment = await discordTranscripts
            // @ts-ignore
            .createTranscript(channel)
            .catch((error) => {
              console.error(error);
            });

            await interaction.editReply({
              content: "<a:Prints_dark:1085662565541085314> Transcript created, uploading",
            });

          const upload = await discordTranscripts
            // @ts-ignore
            .createTranscript(channel, {
              returnType: "buffer",
            })
            .catch((error) => {
              console.error(error);
            });
          // @ts-ignore
          fs.writeFileSync(`transcripts/transcript-${channel.id}.html`, upload);

          console.log(ticketList);

          await sftp
            .uploadFile(
              `transcripts/transcript-${channel.id}.html`,
              `public/tickets/transcript-${channel.id}.html`
            )
            .then(() =>
              fs.unlink(`transcripts/transcript-${channel.id}.html`, (err) => {
                if (err) throw err;
                console.log(
                  `transcripts/transcript-${channel.id}.html was deleted`
                );
              })
            )
            .catch((error) => {
              console.error(error);
            });

            await interaction.editReply({
              content: `<a:Prints_dark:1085662565541085314> Transcript uploaded, sending transcript in <#${config.transcript.archive_channel_id}>`,
            });

          // @ts-ignore
          await guildChannel
            //@ts-ignore
            ?.send({
              // @ts-ignore
              content: `${channel.name} transcription \n Id: ${
                channel.id
              } \n Discord User: ${
                // @ts-ignore
                channel.topic
                // @ts-ignore
              } \n Discord User Id: ${channel.topic
                .toString()
                .replace("<@", "")
                .replace(">", "")}
            URL: https://download.comparatorcraftsmp.net/tickets/transcript-${
              channel.id
            }.html
            `,
              files: [attachment],
            })
            //@ts-ignore
            .catch((error) => {
              console.error(error);
            });

          await interaction
            .editReply({
              // @ts-ignore
              content: `Created the transcript, check <#${config.transcript.archive_channel_id}> ${channel.topic}`,
              //       ephemeral: true,
            })
            //          .then(() => sftp.end())
            .catch((error) => {
              console.error(error);
            });
        }
      }

      // @ts-ignore
    } catch (error) {
      await interaction.reply({
        content: "There was an error executing this command",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
