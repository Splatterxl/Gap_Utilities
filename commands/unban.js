const Discord = require('discord.js');
let embeds = require('../misc/embeds');

module.exports = {
  help: {
    name: '>unban',
    id: 'unban',
    aliases: ['unban'],
    desc: 'Unbans a user from the guild.',
    example: '>unban 92471037298547',
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (!msg.guild.me.hasPermission('BAN_MEMBERS'))
      return msg.channel.send(embeds.permissionsMissing('ban_members'));
    // @ts-ignore
    if (
      !msg.member.hasPermission('BAN_MEMBERS') &&
      msg.author.id != '728342296696979526'
    )
      return msg.channel.send(embeds.userPermissionsMissing('ban_members'));
    if (!args[1])
      ctx.respond(
        new Discord.MessageEmbed({
          description: `<:redTick:796095862874308678> Please specify a user to ban!`,
          color: 'RED',
        })
      );
    let err = false;
    msg.guild.members.unban(args[1], {
      reason: args[2] ? args.slice(2).join(' ') : 'No reason specified',
    });
    if (err) return;
    ctx.respond(
      new Discord.MessageEmbed({
        description: `<:greenTick:796095828094615602> Unbanned **${
          (await bot.users.fetch(idify(args[1]))).tag
        }** for \`${
          args[2] ? args.slice(2).join(' ') : 'No reason specified'
        }\`.`,
        color: 'GREEN',
      })
    );
  },
};
