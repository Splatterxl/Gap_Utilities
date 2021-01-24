const Discord = require('discord.js');
let embeds = require('../misc/embeds');

module.exports = {
  help: {
    name: '>purge',
    id: 'purge',
    aliases: ['purge', 'p'],
    desc: 'Purges messages from the channel.',
    example: '>purge 10',
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db) => {
    if (!msg.guild.me.hasPermission('MANAGE_MESSAGES'))
      return msg.channel.send(embeds.permissionsMissing('manage_messages'));
    if (!msg.member.hasPermission('MANAGE_MESSAGES'))
      if (!require('../whitelist').includes(msg.author.id))
        msg.channel.send(embeds.userPermissionsMissing('manage_messages'));
    let purgeNumber = parseInt(args[1]);

    if (!purgeNumber)
      return msg.reply('Please specify a number of messages to purge.');
    if (purgeNumber >= 100)
      return msg.reply('I can only purge 1000 messages at a time.');

    /**
     * @type {Discord.TextChannel}
     */
    const channel = msg.channel;
    msg.delete();
    channel.bulkDelete(purgeNumber).then(msgs => {
      msg.channel
        .send(
          `<:greenTick:796095828094615602> Successfully purged ${msgs.size.toLocaleString()} messages.`
        )
        .then(msg => setTimeout(() => msg.delete(), 2500));
    });
  },
};
