const Discord = require('discord.js');
const idify = require('../misc/idify');
let embeds = require('../misc/embeds');

module.exports = {
  help: {
    name: '>ban',
    id: 'ban',
    aliases: ['bean', 'banne', 'bend'],
    desc: 'Ban members of the server.',
    example: '>ban 770232718339604522',
    category: 'moderation',
    whitelisted: false,
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   * @param {firebase.default.database.Database} db
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (!msg.guild.me.hasPermission('BAN_MEMBERS'))
      return ctx.respond(embeds.permissionsMissing('ban_members'));
    // @ts-ignore
    if (!msg.member.hasPermission('BAN_MEMBERS'))
      if (
        msg.author.id != '728342296696979526'
      ) {
        return ctx.respond(
          embeds.userPermissionsMissing('ban_members')
        );
      }
    if (!args[1])
      return ctx.respond(
        new Discord.MessageEmbed({
          color: 'RED',
          description: `<:redTick:796095862874308678> You didn't specify a user to ban!`,
        })
      );
    let err = false,
      target;
    try {
      target = await msg.guild.members.fetch(idify(args[1]));
    } catch {
      return ctx.respond(
        new Discord.MessageEmbed({
          color: 'RED',
          description: `<:redTick:796095862874308678> I couldn't find a user from the text \`${args[1]}\`!`,
        })
      );
    }
    if (target.user.id == ctx.message.author.id)
      return ctx.respond(
        new Discord.MessageEmbed({
          color: 'RED',
          description: `<:redTick:796095862874308678> Don't ban yourself!`,
        })
      );
    if (ctx.whitelist?.includes(target?.user?.id))
      return ctx.respond(
        new Discord.MessageEmbed({
          color: 'RED',
          description: `<:redTick:796095862874308678> I couldn't ban that user.`,
        })
      );
    if (!target?.bannable)
      return ctx.respond(
        new Discord.MessageEmbed({
          color: 'RED',
          description: `<:redTick:796095862874308678> I can't ban that user because they are higher than me in the role heirarchy! Please move my role up and try again.`,
        })
      );
    target.user.send(
      new Discord.MessageEmbed({
        description: `You were **banned** from __${msg.guild.name}__ for \`${
          args[2] ? args.slice(2).join(' ') : 'No reason specified.'
        }\`.`,
        color: 'RED',
        footer: `Server ID: ${msg.guild.id}\nOwner: ${
          msg.guild.owner
            ? msg.guild.owner.tag
            : (await msg.guild.members.fetch(msg.guild.ownerID)).tag
        } (${msg.guild.ownerID})`,
      })
    );
    await target
      .ban({
        reason: `[ Ban by ${msg.author.tag} ] ${
          args[2] ? args.slice(2).join(' ') : 'No reason specified.'
        }`,
      })
      .catch((r) => {
        err = true;
        msg.react('❌');
        return ctx.respond(
          new Discord.MessageEmbed({
            color: 'RED',
            description: `<:redTick:796095862874308678> I couldn't ban that user.`,
          })
        );
      });
    if (err) return;
    ctx.respond(
      new Discord.MessageEmbed({
        description: `<:greenTick:796095828094615602> Banned **${
          (await bot.users.fetch(idify(args[1]))).tag
        }** for \`${(await msg.guild.fetchBan(idify(args[1])))?.reason}\`.`,
        color: 'GREEN',
      })
    );
  },
};
