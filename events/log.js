const Discord = require('discord.js');
const embeds = require('../assets/embeds');

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Guild} guild 
 * @param {string} message
 * @param {{o?:Discord.Message,n?:Discord.PartialMessage}} optional
 */
module.exports = async (bot, botChecker, guild, message, type, optional) =>
{
    if (botChecker) return;
    // @ts-ignore
    switch (type.toLowerCase())
    {
        case "edit":
            // @ts-ignore
            (await guild.channels.cache.find(c => c.name == 'logs')).send(embeds.logging.edit(bot, optional.o, optional.n));
            break;
    }
};