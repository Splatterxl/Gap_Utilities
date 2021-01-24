const Discord = require('discord.js');
const fs = require('fs'),
  path = require('path'),
  cmds = fs
    .readdirSync(path.join(__dirname))
    .filter(v => v.endsWith('.js'))
    .map(v => (v == 'help.js' ? module.exports.help : require(`./${v}`).help)),
  categories = cmds.map(v => [v?.id, v?.category]),
  catL = {};
categories.forEach(v => {
  if (v[1] && v[1] in catL == false) catL[v[1].toLowerCase()] = [];
  v[1] ? catL[v[1].toLowerCase()].push(v[0]) : undefined;
});
module.exports = {
  help: {
    name: '>help',
    id: 'help',
    aliases: ['help', 'halp', 'h'],
    category: 'bot',
    desc: 'Gets information about a command.',
    example: '>help help',
    whitelisted: false,
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (!args[1])
      return ctx.respond(
        await home(
          (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val(),
          ctx
        )
      );
    // @ts-ignore
    let cmd = global.cmds.find(
      c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1])
    );

    if (!cmd) {
      if (!category(args[1]?.toLowerCase(), ctx)) {
        return (() => {
          ctx.respond(
            `It seems **${args[1]}** is not a valid command or category!`
          );
          msg.react('❌');
        })();
      } else {
        return ctx.respond(category(args[1]?.toLowerCase(), ctx));
      }
    }
    let helpInfo = cmd.help;
    let _ = new Discord.MessageEmbed({
      color: 'YELLOW',
      title: `Help for command \`${args[1]}\``,
      description: 'Here is all the available info I can find on that command.',
      fields: [
        {
          name: `Name`,
          value: helpInfo.id,
        },
        {
          name: `Description`,
          value: helpInfo.desc,
        },
        {
          name: 'Example',
          value: helpInfo.example?.replace(
            />/,
            (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()
          ),
        },
        {
          name: 'Aliases',
          value: helpInfo.aliases
            ? helpInfo.aliases.map(v => `\`${v}\``).join(', ')
            : 'None.',
        },
        { name: 'Category', value: helpInfo.category },
      ],
    });
    ctx.respond(_);
  },
};

let home = async (prefix, ctx) =>
  new Discord.MessageEmbed({
    title: 'Eureka! Help',
    description:
      'There are many commands in this bot. Get specific information about them by hitting `' +
      prefix +
      'help <command|category|alias>`.',
    timestamp: Date.now(),
    fields: commands(ctx),
    color: 'YELLOW',
  });

let commands = ctx => {
  let arr = Object.entries(catL)
    .map(([K, V]) => ({
      name: K.replace(/\b\w/g, v => v.toUpperCase()),
      value:
        V.map(v => `\`${v}\``).length +
        ` command${V.length > 1 ? 's' : ''}.`,
      inline: true,
    }))
    .filter(({ name }) => (name == 'Nsfw' ? ctx.channel.nsfw : true));

  return arr;
};

/**
 *
 * @param {string} args
 * @returns {Discord.MessageEmbed}
 */
function category(args, ctx) {
  return catL[args]
    ? new Discord.MessageEmbed({
        title: 'Eureka! Help',
        color: 'YELLOW',
        fields: [
          {
            name: 'Commands for ' + args,
            value: `${
              catL[args]
                .filter(v =>
                  ctx.channel.nsfw ? v : !ctx.util.resolveCommand(v).nsfw
                )
                .map(v => `\`${v}\``)
                .join(', ') ||
              'NSFW Commands are only shown in NSFW Channels. Otherwise, no commands exist in this category.'
            }`,
          },
        ],
      })
    : null;
}
