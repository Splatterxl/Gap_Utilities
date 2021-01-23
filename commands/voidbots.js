const Discord = require('discord.js');

module.exports = {
  help: {
    name: '>voidbots',
    id: 'voidbots',
    aliases: ['vb'],
    whitelisted: false,
    desc: 'Get various information about the bot',
    category: 'bot',
  },
  run: async (bot, msg, args, db, flags, ctx) => {
    ctx.respond(
      new Discord.MessageEmbed({
        title: 'Reviews on Void Bots',
        fields: (await require('../misc/vbapi').reviews(bot.user.id))?.map(
          v => {
            console.log(v);
            return {
              name: bot.users.cache.get(v?.author).tag,
              value: `**Text**: ${v?.text}\n**Rating**: ${v?.rating}\n**Response**: ${v?.response?.message}`,
            };
          }
        ),
      })
    );
  },
};
