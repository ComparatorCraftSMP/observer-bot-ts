import { EmbedBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  Interaction,
  InteractionType,
  ChannelType,
  Message,
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
            sendChannel?.send({ content: msg.content });
          }

          if (msg.attachments) {
            msg.attachments.map((attch) =>
              sendChannel?.send({ files: [attch] })
            );
          }

          if (msg.embeds) {
            msg.embeds.map((embed) => sendChannel?.send({ embeds: [embed] }));
          }

          if (msg.stickers) {
            msg.stickers.map((sticker) =>
              sendChannel?.send({ files: [sticker.url] })
            );
          }
        }
      }
    }
  },
};
