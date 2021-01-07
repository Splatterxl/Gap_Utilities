const tags = require("../assets/tags.json")

 module.exports.run = async(bot,msg,args)=>{if (args[1]) msg.reply(tags.global[args[1]]?tags.global[args[1]].replace(/!!{botid}!!/g, bot.user.id):"No such tag!");}
