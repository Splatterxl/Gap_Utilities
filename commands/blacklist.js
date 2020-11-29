const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">blacklist",
        "id": "blacklist",
        "aliases": [
            "blacklist"
        ],
        "desc": "[JOKE] Add members to the blacklist.",
        "example": ">blacklist 08197439825"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!args[1]) return msg.channel.send(embeds.noArgs('>blacklist 29735812751985', 1, {
            name: 'Argument Explanation',
            value: '```\n<member>: The ID of the member to add to the blacklist.```',
            inline: true
        }));
        msg.react('✅');
        msg.channel.send(embeds.blacklistAddJoke(msg));
    }
};