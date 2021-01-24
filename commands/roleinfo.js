const Discord = require('discord.js');
module.exports = {
  help: {
    name: '>roleinfo',
    id: 'roleinfo',
    aliases: ['ri', 'role'],
    category: 'utility',
    desc: 'Gets information about a role.',
    example: '>ri Member',
    whitelisted: false,
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    let target = flags.includes('fetch')
      ? await msg.guild.roles.fetch(ctx.util.idify(args[1]))
      : msg.guild.roles.cache.find(u =>
          u.id == ctx.util.idify(args[1]) || args[1]
            ? u.name
                .toLowerCase()
                .includes(args.slice(1).join(' ')?.toLowerCase())
            : false
        );
    if (!target) target = msg.member.roles.highest;
    ctx.util.paginate(
      [
        new Discord.MessageEmbed({
          title: `${target.name} (${target.id})`,
          color: target.color,
          description: `Role information for role <@&${target.id}> (ID: ${target.id}, Name: ${target.name}) in guild ${target.guild.name}`,
          fields: [
            {
              name: 'Name',
              value: target.name,
            },
            {
              name: 'ID',
              value: target.id,
            },
            {
              name: 'Position',
              value: target.position,
            },
          ],
        }),
        new Discord.MessageEmbed({
          title: `${target.name} (${target.id})`,
          fields: [
            {
              name: 'Members',
              value:
                (target.members
                  .map(v => v.toString())
                  .slice(0, 25)
                  .join(', ') +
                (target.members.map(v => v.toString()).slice(25).length != 0
                  ? ` and ${
                      target.members.map(v => v.toString()).slice(25).length
                    } more...`
                  : '')) || "None",
            },
          ],
          color: target.color,
          thumbnail: { url: target.guild.iconURL() },
        }),
        new Discord.MessageEmbed({
          title: `${target.name} (${target.id})`,
          fields: [
            {
              name: 'Permissons',
              value: target.permissions.has(
                Discord.Permissions.FLAGS.ADMINISTRATOR
              )
                ? '`ADMINISTRATOR`'
                : target.permissions
                    .toArray()
                    ?.map(v => `\`${v}\``)
                    .join(' • ') || 'None',
            },
          ],
          color: target.color,
          thumbnail: { url: target.guild.iconURL() },
        }),
      ].map((v, i, a) => v.setFooter?.(`Page ${i + 1} of ${a.length}`)),
      ctx,
      {}
    );
  },
};
