const moment = require("moment");

module.exports = {
  help: {
    name:">uptime",
    id:"uptime",
    aliases:["wakey"],
    whitelisted:false,
    desc:"Gets how long ago the bot was started",
    category:"bot"
  },
  run:async (bot,msg,args,db,flags) => {msg.reply(`The bot has been online for **${moment(global.timestamp).from(moment()).replace(/ago/g, "")}**.`}
}
