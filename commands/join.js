const Discord = require('discord.js');
let embeds = require('../misc/embeds');

module.exports = {
    help: {
        "name": ">join",
        "id": "join",
        "aliases": [
            "join"
        ],
        "desc": "Displays the bot join message.",
        "example": ">join",
        whitelisted: false,
        category: "bot"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        msg.channel.send(embeds.newGuild());
    }
};
