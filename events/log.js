const Discord = require('discord.js');
const embeds = require('../assets/embeds');

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Guild} guild 
 * @param {string} message
 * @param {{o?:Discord.Message,n?:Discord.PartialMessage,c?:Discord.Channel,m?:Discord.Message|Discord.PartialMessage}} optional
 */
module.exports = async (bot, botChecker, guild, message, type, optional) =>
{
    try
    {
        if ((botChecker !== null) && botChecker) return;
        if (!guild) return;
        let channel = (await guild.channels.cache.find(c => c.name == 'logs'));
        // @ts-ignore
        switch (type.toLowerCase())
        {
            case "edit":
                if (!channel) return optional.o.channel.send('You must have a #logs channel.', embeds.logging.noLogChan());
                // @ts-ignore
                await channel.send(embeds.logging.edit(bot, optional.o, optional.n)).catch(e => { optional.n.channel.send(embeds.rejected(e)); });
                break;
            case "channel.create":
                // @ts-ignore
                channel.send(embeds.logging.channel.create(optional.c)).catch(e => { optional.c.send(embeds.rejected(e)); });
                break;
            case "channel.delete":
                // @ts-ignore
                channel.send(embeds.logging.channel.delete(optional.c)).catch(e => { });
                break;
            case 'delete':
                if (!channel) return optional.o.channel.send('You must have a #logs channel.', embeds.logging.noLogChan());
                // @ts-ignore
                channel.send(embeds.logging.delete(optional.m)).catch(e => { optional.m.channel.send(embeds.rejected(e)); });
        }
    } catch (e) { }
};