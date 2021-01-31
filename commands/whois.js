const Discord = require('discord.js');
const idify = require('../misc/idify');
const err = require('../misc/errorHandler'),
  moment = require('moment'),
  depression = require('../misc/depression'),
  { SnowflakeUtil } = Discord,
  proc = require('child_process');

module.exports = {
  help: {
    name: '>whois',
    id: 'whois',
    whitelisted: false,
    aliases: ['ui', 'userinfo', 'profile'],
    desc: 'Gets a profile on a user.',
    example: '>whois 13802482938501',
    category: 'utility',
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    try {
      /**
       * @type {?Discord.GuildMember}
       */
      let member = args[1] ? await ctx.util.get.member(args.slice(1).join(" ")) : msg.member,
        user = member ? member.user : args[1] ? await ctx.util.get.member(args.slice(1).join(" ")) : msg.author
      if (!user) {
        user = msg.author;
        member = msg.member;
      }
      const flagArray = user.flags
        ? [
            user.flags.has(Discord.UserFlags.FLAGS.DISCORD_EMPLOYEE)
              ? '<:stafftools:799349935224258600>'
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.EARLY_SUPPORTER)
              ? '<:supporter:799348812803342407>'
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.EARLY_VERIFIED_BOT_DEVELOPER)
              ? '<:early_verified_dev:799325612669009990>'
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.PARTNERED_SERVER_OWNER)
              ? '<:discord_partner:799348216431771720>'
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BALANCE)
              ? '<:hype_balance:799318532407689244>'
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRAVERY)
              ? '<:hype_brave:799318595782967307>'
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRILLIANCE)
              ? '<:hype_brill:799325528960139294>'
              : undefined,
            user.avatar?.startsWith('a_') ||
            !!user.presence.activities.find(
              ({ type }) => type === 'CUSTOM_STATUS'
            )?.emoji.id ||
            !!ctx.client.guilds.cache.find(
              ({ members }) => members.cache.get(user.id)?.premiumSinceTimestamp
            )
              ? '<:DiscordNitro:802628037081825300>'
              : undefined,
          ]
        : 'None';
      let _ = new Discord.MessageEmbed({
        color: 'YELLOW',
        title: 'User Statistics',
        description: `These are all the user statistics I could find for ${user.tag} (${user.id})`,
        fields: [
          {
            name: 'User Tag',
            value: user?.tag || 'None',
            inline: true,
          },
          {
            name: 'Nickname',
            value: member?.displayName || 'None',
            inline: true,
            guildSpecific: true,
          },
          {
            name: 'ID Breakdown',
            value: user?.id
              ? Object.entries(SnowflakeUtil.deconstruct(user?.id))
                  .filter(([, V]) => !(V instanceof Date))
                  .map(
                    ([K, V]) =>
                      `**${K.replace(/\b\w/g, t =>
                        t.toUpperCase()
                      )}**: \`${V}\``
                  )
              : 'None' || 'None',
            inline: false,
          },
          {
            name: `Joined [${
              member ? moment(member?.joinedTimestamp).fromNow() : null
            }] at`,
            value: member?.joinedAt.toLocaleString() || 'None',
            inline: true,
            guildSpecific: true,
          },
          {
            name: `Created [${moment(user.createdTimestamp).fromNow()}] at`,
            value: user?.createdAt.toLocaleString() || 'None',
            inline: true,
          },
          {
            name: 'Account Type',
            value: user?.bot ? '🤖' : user?.system ? 'System' : '👨' || 'None',
            inline: true,
          },
          {
            name: 'Status',
            value: user?.presence?.clientStatus
              ? Object.entries(user.presence?.clientStatus).map(
                  ([K, V]) =>
                    `**${K.replace(/\b\w/g, t => t.toUpperCase())}**: ${V}`
                )
              : 'Offline' || 'None',
            inline: true,
          },
          {
            name: 'Badges',
            value:
              `${
                user?.flags && flagArray.join('').trim()
                  ? flagArray.join('')
                  : 'None'
              }` || 'None',
            inline: true,
          },
          {
            name: `Roles [${member?.roles.cache.size - 1}]`,
            value: `**Highest**: <@&${member?.roles.highest.id}> (${member?.roles.highest.id})\n**Hoist**: <@&${member?.roles.hoist.id}> (${
              member?.roles.hoist.id
            })\n**First three**: ${
              member?.roles.cache
                .map(v => v.toString())
                .filter(v => v !== '@everyone')
                .sort((a, b) => a.position - b.position)
                .slice(0, 3)
                .join(', ') || 'None'
            }`,
            inline: false,
            guildSpecific: true,
          },
        ]
          .filter(v => (member ? true : !v.guildSpecific))
          .filter(v => v.name && v.value),
        thumbnail: {
          url: user.avatarURL({ dynamic: true }),
        },
      });
      ctx.respond(_);
    } catch (e) {
      msg.reply(err.find(`${e}`));
    }
  },
};
