export const config = {
  botOwner: "",
  embedColor: "#00a3ff",
  clientId: "",
  application: {
    ticket_category: "",
    staff_role: "",
    member_role: "",
    applicant_role: "",
    message: "",
  },
  plan: { url: "", server: "" },
  dynmap: {
    url: "",
    cmdPerms: {
      // use role ids 
      // list of permissions you can use are found here: https://discord-api-types.dev/api/discord-api-types-payloads/common#PermissionFlagsBits 
      addMarker: { role_ids: [], permissions: ['SendMessages'] },
      deleteMarker: { role_ids: [], permissions: ['ManageChannels'] },
    },
  },
  active_role: {
    enabled: false,
    role_id: "",
    activity: 2,
    member_role_id: "",
  },
  og_role: {
    enabled: false,
    role_id: "",
    joined_before: 0, /* unix timestamp */
    member_role_id: "",
  },
  news: {
    enabled: false,
    channel_id: "",
    category_id: "",
  },
  guild_id: "",
  ip: "",
};
