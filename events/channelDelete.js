const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Channel} c 
     */
    run: (bot, c) =>
    {
        (require('./log'))(bot, null, null, null, 'channel.delete', { c: c });
    }
};