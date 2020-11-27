const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message | Discord.PartialMessage} m
     */
    run: (bot, m) =>
    {
        (require('./log'))(bot, m.author.bot, m.guild, null, 'delete', { m: m });
    }
};