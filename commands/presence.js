const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">presence",
        "id": "presence",
        "aliases": [
            "presence"
        ],
        "desc": "Changes the presence of the bot.",
        "example": ">presence playing with fire"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!(msg.author.id === '728342296696979526')) { msg.react('❌'); return msg.channel.send(embeds.notWhitelisted()); };
        // @ts-ignore
        global.presenceInterval.close();
        switch (args[1].toLowerCase())
        {
            case 'playing':
                bot.user.setActivity({
                    type: 'PLAYING',
                    name: msg.content.slice(17)
                }).catch(e => msg.channel.send(embeds.rejected(e)));;
                break;
            case 'listening':
                bot.user.setActivity({
                    type: 'LISTENING',
                    name: msg.content.slice(20)
                }).catch(e => msg.channel.send(embeds.rejected(e)));
                break;
            case 'custom':
                bot.user.setActivity({
                    type: 'CUSTOM_STATUS',
                    name: msg.content.slice(17)
                }).catch(e => msg.channel.send(embeds.rejected(e)));
                break;
            case 'watching':
                bot.user.setActivity({
                    type: 'WATCHING',
                    name: msg.content.slice(18),
                }).catch(e => msg.channel.send(embeds.rejected(e)));
                break;
            case 'streaming':
                bot.user.setActivity({
                    type: 'STREAMING',
                    name: msg.content.slice(19)
                }).catch(e => msg.channel.send(embeds.rejected(e)));
                break;
            case 'competing':
                bot.user.setActivity({
                    type: 'COMPETING',
                    name: msg.content.slice(19)
                }).catch(e => msg.channel.send(embeds.rejected(e)));
                break;
            default:
                return msg.react('❌');
        }
        msg.channel.send('Presence successfully updated.');
        msg.react('✅');
    }
};