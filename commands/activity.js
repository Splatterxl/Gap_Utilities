const Discord = require('discord.js'),
  Flags = require('../misc/flags.js'),
  paginate = require('../misc/paginate');

module.exports = {
  /**
   *
   * @param {Discord.Client} bot
   * @param {Discord.Message} msg
   * @param {string[]} args
   * @param {*} db
   * @param {Flags} flags
   * @param {CTX} ctx
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    let target = await ctx.util.get.user(ctx, ctx.args.join(" ") || ctx.message.author.id);
    if (target === null) return;
    if (target === undefined) target = ctx.message.author;

    paginate(
      target?.presence.activities?.map(
        (v, i, a) =>
          new Discord.MessageEmbed({
            description: `**${[
              ...(v.type == 'LISTENING'
                ? 'LISTENING TO'
                : v.type == 'COMPETING'
                ? 'COMPETING IN'
                : v.type),
            ]
              .map((v, i) => (i == 0 ? v.toUpperCase() : v.toLowerCase()))
              .join('')
              .replace(/_/g, ' ')}** ${
              v.type == 'CUSTOM_STATUS' ? '' : v.name + ' '
            }\n${v.details ?? ""}\n${v.state ?? ""}${Object.keys(require("parse-ms")(v.createdTimestamp)).filter(([K]) => K != "milliseconds").map(([K, V]) => `${V}${K}`).join("")} elapsed`.replace(/( +- +|\n+)/g, '\n'),
            color: 'YELLOW',
            title: `${target?.tag}'s Presence`,
            footer: { text: `Page ${i + 1} of ${a.length}` },
            image: {
              url: v.emoji
                ? `https://cdn.discordapp.com/emojis/${v.emoji.id}.${
                    v.emoji.animated ? 'gif' : 'png'
                  }?v=1`
                : v.assets
                ? v.assets.largeImageURL()
                : '',
            },
            /*fields: [
              { name: 'Details', value: v.details },
              { name: 'State', value: v.state },
              {
                name: 'Time elapsed',
                value: require('moment')(v.createdTimestamp)
                  .fromNow()
                  .replace(/ ago/g, ''),
              },
              { name: 'Application ID', value: v.applicationID },
            ].filter(v => !!v.value),*/
            thumbnail: { url: v.assets?.smallImageURL() },
          })
      ) || [ctx.util.embeds.errorEmbed('This user has no activities.')],
      ctx,
      { respond: true, default: 'The user has no activities.' }
    );
  },
  help: {
    name: '>activity',
    id: 'activity',
    aliases: ['act'],
    desc: 'Get activìty info about you or another user!',
    example: '>activity',
    whitelisted: false,
    nsfw: false,
  },
};
