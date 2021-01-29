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
        `Hai! :wave: \n${(
          bot.user.id == '784833064400191509'
            ? "Use `eb;help` to get started!"
            : `**Guild prefixes**: ${db.get(`settings.g${msg.guild.id}.prefixes`).map(v => v === "" ? "`No prefix`" : "`\`${v}\``).join(", ")}\n**User prefixes**: ${db.get(`settings.u${msg.author.id}.prefixes`)?.map(v => v === "" ? "`No prefix`" : `\`${v}\``).join(", ") ?? "None"}`
        )}!`
      );

    if (msg.content.match(/<@!?\d{18}>/g)) {
      for (let ping of msg.content.match(/<@!?\d{18}>/g)) {
        if (db.get(`afk/${msg.guild.id}/${idify(ping)}`)) {
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
