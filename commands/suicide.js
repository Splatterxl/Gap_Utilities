const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">suicide",
        "id": "suicide",
        "aliases": [
            "suicide",
            "depression"
        ],
        "desc": "If you think a user is planning to end their life, use this command. It'll direct them to a few assets to help them.",
        "example": ">ping"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        msg.channel.send(new Discord.MessageEmbed({
            title: 'Suicide',
            description: 'Even though life is tough at the moment, you are still and always will be valued. Here\'s a list of good assets to help you.',
            fields: [
                {
                    name: 'Samaritans',
                    value: '[Click Me](https://www.samaritans.org/)',
                    inline: true
                },
                {
                    name: 'Cute Cat Videos',
                    value: '[Click Me](https://www.youtube.com/results?search_query=cute+cats)',
                    inline: true
                },
                {
                    name: 'Cute Dog Videos',
                    value: '[Click Me](https://www.youtube.com/results?search_query=cute+dogs)',
                    inline: true
                }
            ]
        }));
    }
};