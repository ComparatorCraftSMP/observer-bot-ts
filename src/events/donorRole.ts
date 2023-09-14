import { CommandInteraction, Interaction, InteractionType, ChannelType, GuildMember } from "discord.js";

//This logs all interactionsdoes
module.exports = {
  name: "guildMemberUpdate",
  execute(oldMember: GuildMember, newMember: GuildMember) {
    if (oldMember.roles.cache.some((role) => role.id === "762764245380104192") && newMember.roles.premiumSubscriberRole) return

    if (newMember.roles.premiumSubscriberRole && !oldMember.roles.premiumSubscriberRole) {
      newMember.roles.add('762764245380104192');
    }

    if (!newMember.roles.premiumSubscriberRole && oldMember.roles.premiumSubscriberRole) {
      newMember.roles.remove('762764245380104192')
    }
  },
};
