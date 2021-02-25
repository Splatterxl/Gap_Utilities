const Discord = require('discord.js'),
  embeds = require('../misc/embeds');

const { BaseCommand } = require('../structures/classes');

class Afk extends BaseCommand {
  constructor() {
    super(
      {
        name: '>afk',
        id: 'afk',
        aliases: ['afk'],
        desc: 'Set an afk status for you. Use `>afk` again to un-afk.',
        example: '>afk',
        category: 'utility',
        whitelisted: false,
        nsfw: false,
      },
      async (bot, msg, args, db, flags, ctx) => {
        try {
          let canSetNickname = true;
          if (!msg.guild.me.permissions.has('MANAGE_NICKNAMES'))
            canSetNickname = false;
          if (msg.member.displayName.startsWith('[AFK]') && canSetNickname) {
            msg.member
              .setNickname(msg.member.displayName.slice(6))
              .catch(e => {});
            // @ts-ignore
            msg.channel.send(embeds.afkRemove(msg));
          }
          if (msg.member.displayName.startsWith('[AFK]')) return;

          db.set(
            `afk.${msg.author.id}`,
            args[1] ? args.slice(1).join(' ') : 'No reason specified.'
          );

          ctx.respond(
            new Discord.MessageEmbed({
              color: 'GREEN',
              description: `<:greenTick:796095828094615602> You have been set AFK for: \`${
                args[1] ? args.slice(1).join(' ') : 'No reason specified'
              }\``,
            })
          );
        } catch (e) {
          console.log(e);
        }
      }
    );
  }
  static run (...p) {
    return new Afk().run(...p)
  }
}

module.exports = Afk;
