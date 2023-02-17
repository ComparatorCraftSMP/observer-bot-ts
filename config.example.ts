export const config = {
  botOwner: "",
  embedColor: "#00a3ff",
  _comment:
    "For the scoreboard you can't have more than 25 premade stats, also you can run /statlist to see all the scoreboard commands you can do on your server",
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
  ip: "",
};
