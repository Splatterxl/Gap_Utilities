const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
  help: {
    name: '>slowmode',
    id: 'slowmode',
    aliases: ['sm', 'ratelimit'],
    category: 'moderation',
    desc: "Set the channel slowmode!",
    example: '>slowmode 1',
    whitelisted: false,
    requiredPerms: [ "MANAGE_CHANNELS" ]
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (!ctx.message.member.permissions.has("MANAGE_CHANNELS") && !ctx.isOwner) return ctx.respond(ctx.util.embeds.userPermissionsMissing("MANAGE_CHANNELS"));
    if (!args[1]) return ctx.respond(ctx.util.embeds.errorEmbed("An argument for `rateLimit` was not supplied."));
    const time = (()=>{let num = 0;args[1].match(/\d+[msdwymh]?[s]?/)?.map(v => !v.match(/\w+/g) ? `${v}ms` : v).map(v => ms(v)).forEach(v => num += v);return num;})();
    if (!time || isNaN(parseInt(time))) return;
    ctx.channel.setRateLimitPerUser(parseInt(time)).then(() => ctx.respond(ctx.util.embeds.okEmbed(`I have set the channel rate limit to \`${time}\` (${args[1]}).`))).catch(e => ctx.respond(ctx.util.embeds.errorEmbed("I couldn't set the channel rate limit!")))
  },
};
