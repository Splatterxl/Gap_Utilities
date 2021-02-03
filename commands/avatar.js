const Discord = require('discord.js');

module.exports.help = {
  name: '>avatar',
  id: 'avatar',
  aliases: ['av'],
  desc: "Get an image of a user's avatar!",
  category: 'utility',
  whitelisted: false,
  example: '>avatar @Splatterxl#8999',
};
/**
 *
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} d
 * @param {*} e
 * @param {{
 *   args: string[],
 *   util: {
 *     get: {
 *       user (ctx, target: string): Promise<Discord.User>
 *     }
 *   },
 *   message: Discord.Message,
 *   respond (content: Discord.MessageEmbed | Discord.MessageAttachment | string, options?: MessageOptions): Promise<Discord.Message>,
 *   Discord
 * }} ctx
 */
module.exports.run = async (a, b, c, d, e, ctx) => {
  let target = ctx.args[1]
    ? await ctx.util.get.user(ctx, ctx.args.slice(1).join(' '))
    : ctx.message.author;
  if (target === null) return;
  target ??= ctx.message.author;
  ctx.respond(
    new ctx.Discord.MessageEmbed({
      title: `${target.tag}'s Avatar`,
      image: {
        url: target.avatarURL({ dynamic: true, format: 'jpg', size: 1024 }),
      },
      color: 'YELLOW',
      footer: {
        text: `Requested by ${ctx.message.author.tag} (${ctx.message.author.id})`,
      },
    })
  );
};
