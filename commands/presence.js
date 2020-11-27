const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">ping",
        "id": "eval",
        "aliases": [
            "ping",
            "pong"
        ],
        "desc": "Test if the bot is online!",
        "example": ">ping"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!(msg.author.id === '728342296696979526')) return msg.channel.send(embeds.notWhitelisted());

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
        }
    }
};