import { EmbedBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  Interaction,
  InteractionType,
  ChannelType,
  Message,
  resolveColor,
} from "discord.js";
import { config } from "../../config";

//This logs all interactions
module.exports = {
  name: "messageCreate",
  async execute(msg: Message) {
    if (config.news.enabled) {
      const channel = await msg.guild?.channels.fetch(msg.channel.id);

      if (
        channel?.parentId === config.news.category_id &&
        msg.guildId === config.guild_id
      ) {
        const sendChannel = await msg.guild?.channels.fetch(
          config.news.channel_id
        );

        if (sendChannel?.isTextBased()) {
          if (msg.content) {
            const embed = new EmbedBuilder()
              .setAuthor({
                name: msg.author.username,
                // @ts-ignore
                iconURL: msg.author.avatarURL(),
              })
              // @ts-ignore
              .setColor(resolveColor(config.embedColor))
              .setDescription(msg.content)
              .setTimestamp(msg.createdAt);

            sendChannel?.send({ embeds: [embed] });
          }

          if (msg.attachments) {
            if (!msg.content && msg.attachments.size > 0) {
              const embed = new EmbedBuilder()
                .setAuthor({
                  name: msg.author.username,
                  // @ts-ignore
                  iconURL: msg.author.avatarURL(),
                })
                // @ts-ignore
                .setColor(resolveColor(config.embedColor))
                .setDescription(`${msg.author.username} attached:`);

              sendChannel?.send({ embeds: [embed] });
            }

            msg.attachments.map((attch) =>
              sendChannel?.send({ files: [attch] })
            );
          }

          if (msg.embeds) {
            if (!msg.content && msg.embeds.length > 0) {
              const embed = new EmbedBuilder()
                .setAuthor({
                  name: msg.author.username,
                  // @ts-ignore
                  iconURL: msg.author.avatarURL(),
                })
                // @ts-ignore
                .setColor(resolveColor(config.embedColor))
                .setDescription(`${msg.author.username} sent:`);

              sendChannel?.send({ embeds: [embed] });
            }

            msg.embeds.map((embed) => sendChannel?.send({ embeds: [embed] }));
          }

          if (msg.stickers) {
            if (!msg.content && msg.stickers.size > 0) {
              const embed = new EmbedBuilder()
                .setAuthor({
                  name: msg.author.username,
                  // @ts-ignore
                  iconURL: msg.author.avatarURL(),
                })
                // @ts-ignore
                .setColor(resolveColor(config.embedColor))
                .setDescription(`${msg.author.username} sent some stickers!`);

              sendChannel?.send({ embeds: [embed] });
            }

            msg.stickers.map((sticker) =>
              sendChannel?.send({ files: [sticker.url] })
            );
          }
        }
      }
    }
  },
};
