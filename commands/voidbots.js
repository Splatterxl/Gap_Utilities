const Discord = require('discord.js'),
  moment = require("moment")

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
    if (flags.includes("reviews") || flags.includes("r"))
    return ctx.respond(
      new Discord.MessageEmbed({
        color: "YELLOW",
        title: 'Reviews on Void Bots',
        fields: (await require('../misc/vbapi').reviews(bot.user.id))?.map(
          v => ({
              name: bot.users.cache.get(v?.author).tag,
              value: `**Text**: ${v?.text}\n**Rating**: ${v?.rating}\n**Response**: ${v?.response?.message}`,
            })
          
        ),
      })
    );
    else if (flags.includes("voted") || flags.includes("v")) {
      const data = await ctx.util.vbapi.voted(ctx.client.user.id, ctx.util.idify((args[1] ?? (flags.get("voted") || flags.get("v")))) || msg.author.id);
      if (data.error) return ctx.respond(new Discord.MessageEmbed({
        color: "RED",
        description: `<:redTick:796095862874308678> ${data.error[0] == "I" ? "No such user exists and can vote." : data.error}`
      }))
      return ctx.respond(new Discord.MessageEmbed({
        color: data.voted ? "GREEN" : "RED",
        description: `**Has Voted**: \`${data.voted}\`\n${data.voted ? `**Voted at** \`${ctx.util.unixConvert((new Date(data.votedAt)).getTime())}\`\n**Next vote**:\n⇒ __Date__: \`${ctx.util.unixConvert(Date.now() + data.nextVote.ms)}\`\n⇒ __Time left__: \`${moment(Date.now() + data.nextVote.ms).fromNow().replace(/((in )|( ago))/g, "")}\`` : ""}\n\n**Benifits**\nAccess to the anime image commands, and our love ♥️.`,
        footer: `${data.botid} | ${data.voterid} - https://voidbots.net`
      }))
    }
  },
};
