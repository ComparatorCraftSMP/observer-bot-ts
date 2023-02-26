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
import config  from "../../config";
import { client } from "../../index";

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Accept Application")
    .setType(ApplicationCommandType.Message),

  async execute(interaction: MessageContextMenuCommandInteraction) {
    const msg = interaction.targetMessage;
    const guild = interaction.guild
    const cmdUser = await guild?.members.fetch(`${interaction?.member?.user.id}`);
    const applicant = interaction.targetMessage.member;

    try {
      if (msg.channel.type !== ChannelType.DM) {
        if (msg.channel.parentId === config.application.ticket_category) {
          if (
            cmdUser?.roles.cache.find(
              (role) => role.id === config.application.staff_role
            ) 
            || 
            cmdUser?.permissions.has("ManageRoles")
          ) {
            if (applicant?.user.bot) {
              await interaction.reply({
                content:
                  "This is a bot, please run this command on the application not a bot message",
                ephemeral: true,
              });
            }
            applicant?.roles.add(config.application.ticket_category);
            applicant?.roles.remove(config.application.ticket_category);
            await msg.reply({ content: `${config.application.message}` });
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
      } else {
        await interaction.reply({
          content: "This isn't an application (don't try that in my DMs)",
          ephemeral: true,
        });
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
