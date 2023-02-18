export const config = {
  botOwner: "",
  embedColor: "#00a3ff",
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
    role_id: "",
    activity: 2,
    member_role_id: "",
    
  },
  ip: "",
};
