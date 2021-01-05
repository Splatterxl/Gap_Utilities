const { Message, Client } = require('discord.js');

module.exports.help = {
  name:"kill_process",
  id: "kill_process",
  aliases:["fuckoff","die"],
  desc:"Kill the bot's process.",
  whitelisted:false,
  category:"owner"
};
/**
 * 
 * @param {Client} bot 
 * @param {Message} msg 
 * @param {string[]} args 
 */
module.exports.run = (bot, msg, args) => { if (!(msg.author.id === '728342296696979526')) return; process.exit(parseInt(args[1])); };
