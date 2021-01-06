const tags = {
  "vote":"Here's your daily reminder to vote at <https://voidbots.net/bot/!!{botid}!!/vote>!",
  "support":"Do `{prefix}support` to find the invite link!"
};

 module.exports.run = async(bot,msg,args)=>{if (args[1]) msg.reply(tags[args[1]]?tags[args[1]].replace(/!!{botid}!!/g, bot.user.id):"No such tag!");}
