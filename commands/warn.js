const embeds = require('../misc/embeds'),
  idify = require('../misc/idify'),
  crs = require('crypto-random-string');

module.exports = {
  help: {
    name: '>warn',
    id: 'warn',
    example: '>warn @Splatterxl#8999',
    aliases: ['bonk'],
    desc: 'Warn a user.',
    category: 'moderation',
    permLvl: 2
  },
  run: async (bot, msg, args, db, flags, ctx) => {
    if (
      !(
        msg.member.permissions.has('BAN_MEMBERS') &&
        msg.member.permissions.has('KICK_MEMBERS')
      )
    )
      if (!require('../whitelist').includes(msg.author.id))
        return msg.reply(
          embeds.userPermissionsMissing('perm:(kick&&ban)_members')
        );
    if (!args[1])
      return ctx.respond(
        ctx.util.embeds.errorEmbed('Incorrect usage: should have at least one parameter (`Snowflake | Mention`)')
      );
    if (idify(args[1]) === msg.author.id)
      return ctx.respond(new Discord.MessageEmbed({ color: "RED", description: "<:redTick:796095862874308678> Don't warn yourself!"}));
    let str = crs({ length: 5 });
    db.set(`warns.g${msg.guild.id}.${idify(args[1])}.${str}`, {
      moderator: msg.author.id,
      reason: args[2] ? args.slice(2).join(' ') : 'No reason provided.',
    });
    ctx.respond(
      ctx.util.embeds.okEmbed(`Successfully warned **${
        (await bot.users.fetch(idify(args[1]))).tag
      }** for \`${db.get(`warns.g${msg.guild.id}.${idify(args[1])}.${str}.reason`)}\`.`)
    );
  },
};
