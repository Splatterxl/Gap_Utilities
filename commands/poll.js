let Discord = require('discord.js');
let child_process = require('child_process');
let error = require('../misc/Error');
let embed = require('../misc/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require('./../whitelist');

module.exports = {
  help: {
    name: `>poll`,
    id: `poll`,
    aliases: ['pollr', 'yesno'],
    whitelisted: true,
    desc: `Make a poll!`,
    example: `>poll yes no`
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (!ctx.args[2]) return ctx.respond("I need a channel, question and 2 to 9 options.")
    const matchedOpts = ctx.args.slice(2).join(" ").match(/((\"[^"]+\")|(\S+))/g).map(v => v.replace(/\"/g, "")),
      question = matchedOpts[0],
      answers = matchedOpts.slice(1),
      letters = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
    if (answers.length <= 1 || args.length >= 10) return ctx.respond("I need a channel, question and 2 to 9 options.");
    ctx.message.mentions?.channels?.first()?.send?.(new Discord.MessageEmbed({
      footer: { iconURL: ctx.message.author.avatarURL({ dynamic: true }), text: `Poll by ${ctx.message.author.tag}` },
      color: "YELLOW",
      title: question,
      description: `${answers.map((v, i) => `**Option ${i + 1}**: ${v}`).join("\n")}`
    })).then(v => { letters.slice(0, answers.length).map(l => v.react(l)); ctx.respond(`I have created a poll in ${ctx.message.mentions?.channels?.first?.()?.toString()}`) }) || ctx.respond("Something went wrong, try again?")
  }
};
