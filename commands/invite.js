module.exports = { 
  run: async (bot, msg, args) => msg.reply('Invite me to your server here: <https://splatterxl.page.link/UtilityBot>'),
  help:{
    name:">invite",
    id: "invite",
    aliases:["invite"],
    desc:"Get the bot's recommended invite OAuth2 link.",
    category:"bot",
    whitelisted:false
  }
}
