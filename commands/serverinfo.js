const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
  help: {
    name: '>serverinfo',
    id: 'serverinfo',
    aliases: ['si', 'server'],
    category: 'utility',
    desc: "Gets information about the server you're in.",
    example: '>si',
    whitelisted: false,
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    let target = msg.guild,
      dynamic = true;
    ctx.util.paginate(
      [
        new Discord.MessageEmbed({
          title: `Guild ${target.name}`,
          thumbnail: {
            url: target.iconURL({
              dynamic,
            }),
          },
          description: `Information about the guild ${target.name} (${target.id})`,
          fields: [
            {
              name: 'Information',
              value: `**Name**: ${target.name}\n**ID**: ${
                target.id
              }\n\n**Created [${moment(
                target.createdTimestamp
              ).fromNow()}] at**: ${target.createdAt.toLocaleString()}\n\n**Members**: \n  __Human__: ${
                target.members.cache.filter(v => !v.user.bot).size
              }\n  __Bot__: ${
                target.members.cache.filter(v => v.user.bot).size
              }\n  __Total__: ${target.members.cache.size}\n\n**Meta**:\n  __Verified__: ${target.verified}\n  __Partnered__: ${target.partnered}\n\n**Channels**:\n  __Category__: ${target.channels.cache.filter(v => v instanceof Discord.VoiceChannel).size}\n  __Text__: ${target.channels.cache.filter(v => v.type == "text").size}\n  __Voice__: ${target.channels.cache.filter(v => v.type == "voice").size}\n  __News__: ${target.channels.cache.filter(v => v.type == "news").size}\n  __DM__: ${target.channels.cache.filter(v => v.type == "dm").size}\\n${target.vanityURLCode ? `**Vanity URL**:\n  __Code__: \`${target.vanityURLCode}\` (https://discord.gg/${target.vanityURLCode})\n  __Uses__: ${target.vanityURLUses}\n\n` : ""}`,
            },
          ],
          color: 'YELLOW',
          image: {
            url: target.bannerURL({ size: 512 }),
          },
        }),
        new Discord.MessageEmbed({
          title: `${target.name}'s Boost Stats`,
          thumbnail: {
            url: target.iconURL({
              dynamic,
            }),
          },
          description: `${target.name} has ${
            target.premiumSubscriptionCount
          } boosts which takes it to Level ${
            target.premiumTier
          }.\n\nThere are ${
            target.members.cache.filter(v => !!v.premiumSinceTimestamp).size
          } Boosters.`,
          fields: [
            {
              name: 'Individual Statistics [Top 10]',
              value:
                target.members.cache
                  .filter(v => !!v.premiumSinceTimestamp)
                  .sort(
                    (a, b) => a.premiumSinceTimestamp - b.premiumSinceTimestamp
                  )
                  .map(v => v)
                  .slice(0, 10)
                  .map(
                    (v, i) =>
                      `${i + 1}: **${v.user.tag}** | Boosting __for **${moment(
                        v.premiumSinceTimestamp
                      )
                        .fromNow()
                        .replace(/ ago/g, '')}**__.`
                  )
                  .join('\n') || 'None',
            },
          ],
          color: 'YELLOW',
        }),
        new Discord.MessageEmbed({
          title: `${target.name}'s Emojis and Roles`,
          thumbnail: {
            url: target.iconURL({
              dynamic,
            }),
          },
          fields: [
            {
              name: `Emoji [${target.emojis.cache.size}]`,
              value:
                target.emojis.cache
                  .map(v => v.toString())
                  .slice(0, 25)
                  .join(', ') +
                  (target.emojis.cache.map(v => v.toString()).slice(25)
                    .length != 0
                    ? ` and ${
                        target.emojis.cache.map(v => v.toString()).slice(25)
                          .length
                      } more...`
                    : '') || 'None',
            },
            {
              name: `Roles [${target.roles.cache.size}]`,
              value:
                target.roles.cache
                  .map(v => v.toString())
                  .slice(0, 25)
                  .join(', ') +
                  (target.roles.cache.map(v => v.toString()).slice(25).length !=
                  0
                    ? ` and ${
                        target.roles.cache.map(v => v.toString()).slice(25)
                          .length
                      } more...`
                    : '') || 'None',
            },
          ],
          description: `The guild has ${target.emojis.cache.size} emojis and ${target.roles.cache.size} roles.`,
          color: 'YELLOW',
        }),
      ].map((v, i, a) => v.setFooter?.(`Page ${i + 1} of ${a.length}`)),
      ctx,
      { respond: true }
    );
  },
};
