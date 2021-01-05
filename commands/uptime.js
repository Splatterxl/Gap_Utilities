const moment = require("moment");

module.exports = {
  help: {
    name:">uptime",
    id:"uptime",
    aliases:["uptime","wakey"],
    whitelisted:false,
    desc:"Gets how long ago the bot was started",
    category:"bot"
  },
  run:async (bot,msg,args,db,flags) => {msg.reply((moment(Date.now()-global.timestamp)).from(0))}
}
