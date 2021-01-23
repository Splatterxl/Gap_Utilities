const moment = require('moment');

module.exports = {
  help: {
    name: '>uptime',
    id: 'uptime',
    aliases: ['wakey'],
    whitelisted: false,
    desc: 'Gets how long ago the bot was started',
    category: 'bot',
  },
  run: async (bot, msg, args, db, flags) => {
    msg.reply(
      `The bot has been online for **${Object.entries(
        require('parse-ms')(bot.uptime)
      )
        .filter(([K, V]) => K !== 'milliseconds' && V > 0)
        .map(([K, V]) => `${V} ${K.slice(0, -1)}${V === 1 ? '' : 's'}`)
        .join(', ')}**.`
    );
  },
};
