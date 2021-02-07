const Discord = require('discord.js'),
  embeds = require('../misc/embeds'),
  fs = require('fs');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

module.exports = {
  help: {
    name: '>reload',
    id: 'reload',
    aliases: ['r', 'makeThisCommandFuckingWork'],
    desc: 'Reload a(ll) command(s)',
    category: 'owner',
    whitelisted: true,
    usage: '>reload <command> [--force]',
    permLvl: 6
  },
  /**
   *
   * @param {Discord.Client} bot
   * @param {Discord.Message} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (!require('../whitelist').includes(msg.author.id))
      return ctx.respond(ctx.util.embeds.notWhiteslisted());
    if (!args[1])
      return ctx.respond(
        'Command requires at least one argument (`CommandResolvable`)'
      );
    if (
      global.cmds.find(
        c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1])
      ) ||
      args.slice(1).join(' ').includes('--force')
    ) {
      try {
        let cmd = global.cmds.find(
          c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1])
        )?.help.id;
        delete require.cache[require.resolve(`./${cmd}.js`)];
        // @ts-ignore
        try {
          const data = require(`./${cmd}`);
          global.cmds.delete(cmd);
          global.cmds.set(cmd, data.prototype ? new data() : data);
        } catch (e) {
          return ctx.util.paginate([e.stack], ctx, {
            respond: true,
            msgOptions: {
              code: 'xl',
            },
          });
        }
        ctx.respond(
          new Discord.MessageEmbed({
            color: 'GREEN',
            description: `<:greenTick:796095828094615602> \`${
              require.resolve(`./${cmd}`).match(/commands(\/|\\)[^\s]+/g)?.[0]
            }\` (\`${formatBytes(
              fs.statSync(`./commands/${cmd}.js`).size
            )}\`) has been reloaded!`,
          })
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      msg.reply(
        new Discord.MessageEmbed({
          description: '<:redTick:796095862874308678> No such command exists!',
          color: 'RED',
        })
      );
    }
  },
};
