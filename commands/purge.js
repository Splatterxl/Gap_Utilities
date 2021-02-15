const Discord = require('discord.js');
let embeds = require('../misc/embeds');

module.exports = {
  help: {
    name: '>purge',
    id: 'purge',
    aliases: ['purge', 'p'],
    desc: 'Purges messages from the channel.',
    example: '>purge 10',
    requiredPerms: [ "MANAGE_MESSAGES" ],
    permLvl: 3
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db) => {
    if (!msg.guild.me.permissions.has('MANAGE_MESSAGES'))
      return msg.channel.send(embeds.permissionsMissing('manage_messages'));
    if (!msg.member.permissions.has('MANAGE_MESSAGES'))
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
    await msg.delete();
    channel.bulkDelete(purgeNumber).then((msgs) => {
      msg.channel
        .send(
          `<:greenTick:796095828094615602> Successfully purged ${msgs.size.toLocaleString()} messages.\n\n${(() => {
            let map = new Discord.Collection();
            for (let v of map) {
              if (!map.get(v.author?.id)) map.set(v.author?.id, [v]);
              else {
                const value = map.get(v.author?.id);
                value.push(v);
                map.set(v.author?.id, value);
              }
            };
            return map
              .filter((v, i) => v.length && i)
              .map(
                (v, i) =>
                 `**${
                    bot.users.cache.get(i)?.tag || 'Unknown User'
                  } (${i ?? "0"})**: ${v.length} message${v.length > 1 ? 's' : ''}`
                )
              .slice(0, 25)
              .join('\n');
          })()}`
        )
        .then((msg) => setTimeout(() => msg.delete(), 2500));
    });
  },
};
