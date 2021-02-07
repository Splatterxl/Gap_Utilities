const Discord = require('discord.js');
const idify = require('../misc/idify');
let embeds = require('../misc/embeds');

module.exports = {
  help: {
    name: '>say',
    id: 'say',
    aliases: ['echo'],
    desc: '.',
    example: '>say hi',
    category: 'owner',
    whitelisted: true,
    permLvl: 6
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   * @param {firebase.default.database.Database} db
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (!ctx.whitelist.includes(msg.author.id))
      return ctx.respond(embeds.notWhitelisted());
    ctx.respond(
      new Discord.MessageEmbed({
        description: args.slice(1).join(' '),
        color: 'YELLOW',
      })
    );
  },
};
