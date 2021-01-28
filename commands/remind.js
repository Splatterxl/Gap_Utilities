const Discord = require('discord.js'), Flags = require('../misc/flags.js'), paginate = require('../misc/paginate'),
  ms = require("ms") 
module.exports = { /**
 *
 * @param {Discord.Client} bot
 * @param {Discord.Message} msg
 * @param {string[]} args
 * @param {*} db
 * @param {Flags} flags
 * @param {CTX} ctx
 */
  run: async (bot, msg, args, db, flags, ctx) => { 
  if (!args[1] || !args[2]) return ctx.respond(new Discord.MessageEmbed({
    color: "RED",
    description: `:redTick: Incorrect arguments! An argument for ${args[1] ? "`reminder`" : "`time`"} was not provided.`
  }));
  db.set(`reminders.${msg.author.id}`, { author: msg.author.id, link: `https://canary.discord.com/channels/${msg.author.id}/${msg.channel.id}/${msg.id}`, channel: msg.channel.id, content: args.slice(2).join(" "), created: Date.now(), time: Date.now() + (() => {let num = 0; "1d1m1s1ms2hdi".match(/\d+[mshd]+/g).map(v => require("ms")(v)).filter(v => !!v).forEach(v => num += v); return num})() });
  ctx.respond(new Discord.MessageEmbed({
    color: "GREEN",
    description: `:greenTick: I will remind you ${ctx.util.unixConvert(db.get(`reminders.${msg.author.id}`).time)}!`
  }));
  ([[msg.author.id, db.get(`reminders.${msg.author.id}`)]]).forEach(([K,V]) => setTimeout(() => bot.channels.fetch(V.channel).then(channel => channel.send(`<@${V.author}>, ${moment(V.created).fromNow()}. \n${V.content}\n\n${v.link}`).then(() => db.delete("reminders."+ K))), V.time <= Date.now() ? 1 : V.time - Date.now()))
}, help: { name: ">remind", id: "remind", aliases: ["remindme"], desc: "Reminds you to do something!", example: ">remind 12h vote", whitelisted: false, nsfw: false, },};
