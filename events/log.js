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
        // @ts-ignore
        let channel = await guild.channels.cache.get(global.settings.settings[(optional.m) ? optional.m.guild.id : (optional.o) ? optional.o.guild.id : (optional.c) ? optional.c.guild.id : '742477575929987143'].logChan);
        // @ts-ignore
        if (channel == null || global.settings.settings[msg.guild.id].log == false) return;
        // @ts-ignore
        switch (type.toLowerCase())
        {
            case "edit":
                if (!channel) return optional.o.channel.send(embeds.logging.noLogChan());
                // @ts-ignore
                await channel.send(embeds.logging.edit(bot, optional.o, optional.n)).catch(e => { });
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
                channel.send(embeds.logging.delete(optional.m)).catch(e => { });
        }
    } catch (e) { }
};