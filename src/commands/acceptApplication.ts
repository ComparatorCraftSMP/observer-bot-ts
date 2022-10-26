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
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  MessageContextMenuCommandInteraction,
  ChannelType,
} from "discord.js";

import { client } from "../../index";

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Accept Application")
    .setType(ApplicationCommandType.Message),

  async execute(interaction: MessageContextMenuCommandInteraction) {
    const msg = interaction.targetMessage;
    const cmdUser = interaction.member;
    const applicant = interaction.targetMessage.member;

    try {
      if (msg.channel.type !== ChannelType.DM) {
        if (msg.channel.parentId === application.ticket_category) {
          if (
            cmdUser.roles.cache.find(
              (role) => role.id === application.staff_role
            ) ||
            cmdUser.permissions.has("MANAGE_ROLES")
          ) {
            if (applicant.user.bot) {
              await interaction.reply({
                content:
                  "This is a bot, please run this command on the application not a bot message",
                ephemeral: true,
              });
            }
            applicant.roles.add(application.member_role);
            applicant.roles.remove(application.applicant_role);
            await msg.reply({ content: `${application.message}` });
            await interaction.reply({
              content: "Message sent",
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: "You dont have permission to send this command",
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content: "This isn't an application",
            ephemeral: true,
          });
        }
      }
    } catch (error) {
      await interaction.reply({
        content: "This Context Menu Failed",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
