const Discord = require('discord.js');
const embeds = require('../assets/embeds');

module.exports = {
  help: {
    name: '>reload',
    id: 'reload',
    desc: 'Reload a(ll) command(s)'
  },
  /**
   * 
   * @param {Discord.Client} bot 
   * @param {Discord.Message} msg 
   * @param {string[]} args 
   */
  run: async (bot, msg, args) =>
  {
    if (msg.author.id === '728342296696979526')
    {
      if (!args)
      {
        (require('../events/commandLoader'))(1);
        msg.reply(new Discord.MessageEmbed({
          title: '<a:check:790313499225096213> Done!',
          description: 'All commands have been reloaded!'
        }));
      }
      switch (args[1].toLowerCase())
      {
        case 'all':
          (require('../events/commandLoader'))(1);
          msg.reply(new Discord.MessageEmbed({
            title: '<a:check:790313499225096213> Done!',
            description: 'All commands have been reloaded!'
          }));
          break;
        case 'braincells':
          msg.reply(new Discord.MessageEmbed({
            title: '<a:denied:790664297629876256> An Error occurred',
            description: '```require(\'./commandLoader.js\')(\'braincells\')\n\n^^^^^^^^\n\nNo module \'braincells\' found.```'
          }));
          break;
        default:
          if (global.cmds.get(args[1]) && global.cmds.get(args[1]).run)
          {
            global.cmds.set(args[1], require(`./${args[1]}`));
            msg.reply(new Discord.MessageEmbed({
              title: '<a:check:790313499225096213> Done!',
              description: `\`${args[1]}\` has been reloaded!`
            }));
          }
          else
          {
            msg.reply(new Discord.MessageEmbed({
              title: '<a:denied:790664297629876256> An Error occurred',
              description: '```No such command exists!```'
            }));
          }
      }
    } else return msg.reply(embeds.notWhitelisted());
  }
};