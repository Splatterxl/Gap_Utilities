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
          db.get(`settings.${msg.guild.id}.prefix`),
          ctx
        )
      );
    // @ts-ignore
    let cmd = global.cmds.find(
      c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1])
    );

    if (!cmd) {
      if (!category(args[1]?.toLowerCase(), ctx)) {
        return ctx.respond(
            `It seems **${args[1]}** is not a valid command or category!`
          );
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
            />/g,
            db.get(`settings.g${msg.guild.id}.prefix`)
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

let home = async (prefix, ctx) => {
  
const tips = [
  "You can always use --dm at the end of your command for the bot to DM you the output!",
  `There are ${fs.readdirSync("./commands").length} commands in this bot. Get specific information about them by hitting ${prefix}help <command|category|alias>!`,
  "There are some *secret* easter eggs for you to find!"
]

  return new Discord.MessageEmbed({
    title: 'Eureka! Help',
    footer: { text: "PROTIP: " + tips[Math.floor(Math.random() * tips.length)] },
    timestamp: Date.now(),
    fields: commands(ctx),
    color: 'YELLOW',
    description: "Here are all my categories. Only commands you can run in the current channel are displayed."
  });
}
let commands = ctx => {
  let arr = Object.entries(catL)
    .map(([K, V]) => ({
      name: K.replace(/\b\w/g, v => v.toUpperCase()),
      value:
        V.map(v => `\`${v}\``).length + ` command${V.length > 1 ? 's' : ''}`,
      inline: true,
    }))
    .filter(({ name }) => (name == 'Nsfw' ? ctx.channel.nsfw : true) && (name == "Owner" ? ctx.isOwner : true));

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
