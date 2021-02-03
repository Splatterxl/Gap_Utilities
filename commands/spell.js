const Discord = require('discord.js');
let embeds = require('../misc/embeds');

module.exports = {
  help: {
    name: 'spell',
    id: 'spell',
    usage: '>spell <text>',
    desc: 'Returns a s p e l l e d   o u t version of the text',
    aliases: [],
    whitelisted: false,
    category: 'text',
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args) => {
    msg.channel.send(args.slice(1).join(' ').split('').join(' '));
  },
};
