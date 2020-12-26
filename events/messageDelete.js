const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message | Discord.PartialMessage} m
     */
    run: (bot, m) =>
    {
        // @ts-ignore
        global.snipes.set(m.channel.id, m);
    }
};