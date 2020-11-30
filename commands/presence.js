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
                });
                break;
            case 'listening':
                bot.user.setActivity({
                    type: 'LISTENING',
                    name: msg.content.slice(20)
                });
                break;
            case 'custom':
                bot.user.setActivity(
                    {
                        type: 'CUSTOM_STATUS',
                        name: msg.content.slice(17)
                    }
                );
                break;
            case 'watching':
                bot.user.setActivity({
                    type: 'WATCHING',
                    name: msg.content.slice(18),
                });
                break;
            default:
                return msg.react('❌');
        }
        msg.channel.send('Presence successfully updated.');
        msg.react('✅');
    }
};