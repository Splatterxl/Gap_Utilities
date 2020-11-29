const { Message, Client } = require('discord.js');

module.exports.alias = true;
/**
 * 
 * @param {Client} bot 
 * @param {Message} msg 
 * @param {string[]} args 
 */
module.exports = (bot, msg, args) => { if (!(msg.author.id === '728342296696979526')) return; process.exit(parseInt(args[1])); };