const Discord = require('discord.js'),
  firebase = require('firebase'),
  idify = require('./idify');

module.exports = {
  help: null,
  /**
   *
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {firebase.default.database.Database} db
   */
  run: async (bot, msg, db) => {
    if (msg.author !== null && msg.author.bot) return;
    const arrs = {"thanks":[
      'no problem',
      '👍',
      'coolio',
      'WHAT DID I DO?!',
      'am I in trouble?',
       "I DIDN'T DO IT",
      "np"
    ],"fuckoff":["sure","ok","lmao","what did i do wrong"]};

    if (msg.content.match(new RegExp(`^thanks <@!?${bot.user.id}>$`, 'g')))
      return msg.channel.send(arrs.thanks[Math.floor(Math.random() * arrs.thanks.length)]);

    if (msg.content.match(new RegExp(`^(s(hut)? ?t(he)? ?)?f(uck)?(( ?off)|( ?up?))? <@!?${bot.user.id}>$`, 'g')))
      return msg.channel.send(arrs.fuckoff[Math.floor(Math.random() * arrs.fuckoff.length)]);

    if (
      msg.content.includes(`<@${bot.user.id}>`) ||
      msg.content.includes(`<@!${bot.user.id}>`)
    )
      // @ts-ignore
      msg.reply(
        `Hai! :wave: You can type \`${
          bot.user.id == '784833064400191509'
            ? 'eb;'
            : (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()
        }help\` for a help menu. Hi-tech, eh?`
      );

    if (msg.content.match(/<@!?\d{18}>/g)) {
      for (let ping of msg.content.match(/<@!?\d{18}>/g)) {
        if ((await db.ref(`afk/${msg.guild.id}/${idify(ping)}`).get()).val()) {
          msg.reply(
            new Discord.MessageEmbed({
              color: `YELLOW`,
              title: `${(await bot.users.fetch(ping.replace(/[^\d]/g, ""))).username} is AFK...`,
              description: `> ${db.get(`afk.${ping.replace(/[^\d]/g, "")}`).replace(/\>/g, "\\>")}`,
            })
          );
        }
      }
    }
  },
};
