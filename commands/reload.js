const Discord = require('discord.js');
const embeds = require('../misc/embeds');

module.exports = {
  help: {
    name: '>reload',
    id: 'reload',
    aliases: ["r", "makeThisCommandFuckingWork"],
    desc: 'Reload a(ll) command(s)',
    category: "owner",
    whitelisted: true,
    example: ">reload reload --force"
  },
  /**
   * 
   * @param {Discord.Client} bot 
   * @param {Discord.Message} msg 
   * @param {string[]} args 
   */
  run: async (bot, msg, args, db, flags) =>
  {
    if (require('../whitelist').includes(msg.author.id))
    {
      if (!args)
      {
        (require('../events/commandLoader'))(1);
        msg.reply(new Discord.MessageEmbed({
          title: '<a:check:790313499225096213> Done!',
          description: 'All commands have been reloaded!'
        }));
      }
      switch (args[1]?.toLowerCase())
      {
        case undefined:
        case 'all':
          (require('../events/commandLoader'))(1);
          msg.reply(new Discord.MessageEmbed({
            title: '<:greenTick:796095828094615602> Done!',
            description: 'All commands have been reloaded!'
          }));
          break;
        case 'braincells':
          msg.reply(new Discord.MessageEmbed({
            title: '<:redTick:796095862874308678> An Error occurred',
            description: '```require(\'./commandLoader.js\')(\'braincells\')\n\n^^^^^^^^\n\nNo module \'braincells\' found.```'
          }));
          break;
        default:
          if (!flags.getObj().solo?.includes('event'))
          {
            if ((global.cmds.find(c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1]))) || args.slice(1).join(' ').includes('--force'))
            {
              try
              {
                let cmd = global.cmds.find(c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1]))?.help.id;
                delete require.cache[require.resolve(`./${cmd}.js`)];
                global.cmds.delete(cmd);
                // @ts-ignore
                global.cmds.set(cmd, require(`./${cmd}`).prototype ? new (require(`./${cmd}`))() : require(`./${cmd}`));
                msg.reply(new Discord.MessageEmbed({
                  title: '<:greenTick:796095828094615602> Done!',
                  description: `\`${cmd}\` has been reloaded!`
                }));
              } catch (e) { }
            }
            else
            {
              msg.reply(new Discord.MessageEmbed({
                title: '<:redTick:796095862874308678> An Error occurred',
                description: '```No such command exists!```'
              }));
            }
          } else
          {
            if ((global.cmds.find(c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1]))) || args.slice(1).join(' ').includes('--force'))
            {
              try
              {
                let cmd = global.events.get(args[1]);
                delete require.cache[require.resolve(`../events/${cmd}.event`)];
                global.events.delete(args[1]);
                // @ts-ignore
                global.cmds.set(args[1], require(`../events/${args[1]}.event`).prototype ? new (require(`../events/${args[1]}.event`))() : require(`../events/${args[1]}.event`));
                msg.reply(new Discord.MessageEmbed({
                  title: '<:greenTick:796095828094615602> Done!',
                  description: `\`${args[1]}\` has been reloaded!`
                }));
              } catch (e) { }
            }
            else
            {
              msg.reply(new Discord.MessageEmbed({
                title: '<:redTick:796095862874308678> An Error occurred',
                description: '```No such event exists!```'
              }));
            }
          }
      }
    } else return msg.reply(embeds.notWhitelisted());
  }
};
