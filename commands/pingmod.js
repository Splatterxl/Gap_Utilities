const Discord = require('discord.js');

module.exports.run = async (a, b, args, d, e, ctx) => {
  ctx.channel.send("Are you sure you want to ping a mod?")
ctx.channel
  .awaitMessages((m) => m.author.id == ctx.message.author.id, { max: 1, time: 60000, errors: ["time"] })
  .then((msgs) => {
    if (!["yes","y","yis","accept","true","mhm","sure"].includes(msgs.first().content.toLowerCase().trim())) return ctx.channel.send("Aborted.")
    const ids = ctx.guild.members.cache
      .filter(
        ({ permissions, user }) =>
          permissions.any([
            "BAN_MEMBERS",
            "KICK_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_WEBHOOKS",
          ]) &&
          !user.bot &&
          ["online", "dnd", "idle"].includes(
            Object.values(user.presence.clientStatus ?? {})[0]
          )
      )
      .map(({ user: { id, tag } }) => id);
    return ctx.channel.send(`<@${ids[Math.floor(Math.random() * ids.length)]}>`, ctx.util.embeds.neutralEmbed(`${ctx.message.author.toString()} has mentioned you for \`${args.slice(1).join(" ")}\``));
  });
};
module.exports.help = {
  name: '>pingmod',
  id: 'pingmod',
  aliases: ['pinghelper'],
  desc: 'Pings a moderator.',
  category: 'utility',
  whitelisted: false,
  usage: '>pingmod <reason>',
  permLvl: 1
};
