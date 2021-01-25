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
    msg.channel.send(
      new Discord.MessageEmbed({
        description: args.slice(1).join(' '),
        color: 'YELLOW',
        footer: {
          image_url: msg.author.avatarURL({ dynamic: true }),
          imageURL: msg.author.avatarURL({ dynamic: true }),
          text: `Requested by ${msg.author.tag} (${msg.author.id})`,
        },
      })
    );
  },
};
