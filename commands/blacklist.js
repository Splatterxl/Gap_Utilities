const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">blacklist",
        "id": "blacklist",
        "aliases": [
            "blacklist"
        ],
        "desc": "Add members to the blacklist. [restricted to owner]",
        "example": ">blacklist 08197439825"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!(msg.author.id == "728342296696979526")) return msg.channel.send(embeds.notWhitelisted());
        if (!args[1]) return msg.channel.send(embeds.noArgs('>blacklist 29735812751985', 1, {
            name: 'Argument Explanation',
            value: '```\n<member>: The ID of the member to add to the blacklist.```',
            inline: true
        }));
        msg.react('✅');
        msg.channel.send(embeds.blacklistAddJoke(args));
    }
};