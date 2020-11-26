const Discord = require('discord.js');
const embeds = require('../assets/embeds');

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Guild} guild 
 * @param {string} message
 * @param {{o?:Discord.Message,n?:Discord.PartialMessage,c?:Discord.Channel}} optional
 */
module.exports = async (bot, botChecker, guild, message, type, optional) =>
{
    if (botChecker) return;
    let channel = (await guild.channels.cache.find(c => c.name == 'logs'));
    // @ts-ignore
    switch (type.toLowerCase())
    {
        case "edit":
            if (!channel) return;
            optional.o.channel.send('You must have a #logs channel.', embeds.logging.noLogChan());
            // @ts-ignore
            channel.send(embeds.logging.edit(bot, optional.o, optional.n));
            break;
        case "channel.create":
            // @ts-ignore
            channel.send(embeds.logging.channel.create(optional.c));
            break;
        case "channel.create":
            // @ts-ignore
            channel.send(embeds.logging.channel.delete(optional.c));
            break;
    }
};