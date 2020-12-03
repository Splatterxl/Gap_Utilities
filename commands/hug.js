const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">hug",
        "id": "hug",
        "aliases": [
            "hug"
        ],
        "desc": "Hug a user!",
        "example": ">hug @Splatterxl#8999"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        try { if (msg.mentions.users.first() !== msg.author) msg.channel.send(`**${msg.author.tag}** hugged **${msg.mentions.users.first().tag}**!`); else msg.channel.send(`**${msg.author.tag}** wants a hug...`); } catch (e) { }
    }
};