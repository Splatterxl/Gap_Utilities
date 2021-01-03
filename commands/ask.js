const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">ask",
        "id": "ask",
        "aliases": [
            "ask",
            "8ball"
        ],
        "desc": "Ask the mighty 8ball something. [YES/NO question]",
        "example": ">ask something",
        "category":"fun",
        "whitelisted":false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        let responses = [
            'of course!',
            'I really think so.',
            'I don\'t exactly know...',
            'the 8ball is tired, try again later?',
            'that is not going to ever be true.',
            'no.'
        ];
        let response = responses[Math.floor(Math.random() * responses.length)];
        msg.reply(response);
    }
};
