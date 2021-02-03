const Discord = require('discord.js'),
  ms = require('ms'),
  moment = require('moment');
module.exports = {
  help: {
    name: '>slowmode',
    id: 'slowmode',
    aliases: ['sm', 'ratelimit'],
    category: 'moderation',
    desc: 'Set the channel slowmode!',
    usage: '>slowmode <time>',
    whitelisted: false,
    requiredPerms: ['MANAGE_CHANNELS'],
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   * @param {{channel: Discord.TextChannel}} ctx
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    return ctx.respond(
      ctx.util.embeds.errorEmbed('This command is under construction!')
    );
    if (!ctx.message.member.permissions.has('MANAGE_CHANNELS') && !ctx.isOwner)
      return ctx.respond(
        ctx.util.embeds.userPermissionsMissing('MANAGE_CHANNELS')
      );
    let time = (() => {
      let num = 0;
      args[1]
        ?.match(/\d+[msdwymh]?[s]?/)
        ?.map(v => (!v.match(/\w+/g) ? `${v}ms` : v))
        .map(v => ms(v))
        .forEach(v => (num += v));
      return parseInt(num.toString().slice(0, num.toString().length - 4));
    })();
    if (!args[1]) time = 0;
    if (!time) return;
    ctx.channel
      .setRateLimitPerUser(
        time,
        `[ ${ctx.message.author.tag} ] Slowmode set to ${time} seconds.`
      )
      .then(() => {
        ctx.respond(
          ctx.util.embeds.okEmbed(
            `I have set the channel rate limit to \`${time}000ms\` (\`${moment(
              Date.now() + parseInt(time.toString() + '000')
            )
              .fromNow()
              .replace(/in /g, '')}\`).`
          )
        );
      })
      .catch(() =>
        ctx.respond(
          ctx.util.embeds.errorEmbed("I couldn't set the channel rate limit!")
        )
      );
  },
};
