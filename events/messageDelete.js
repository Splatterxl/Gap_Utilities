const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message | Discord.PartialMessage} m
     */
    run: (bot, m) =>
    {
        if (!m.author || m.author === null)
            (require('./log'))(bot, null, m.guild, null, 'delete', { m: m });
        global.snipes.push(m);
    }
};