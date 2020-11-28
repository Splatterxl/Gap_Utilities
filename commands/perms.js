const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">perms",
        "id": "perms",
        "aliases": [
            "perms",
            "permissions"
        ],
        "desc": "Displays the permissions the bot has.",
        "example": ">perms"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        msg.channel.send((msg.guild.me.hasPermission('ADMINISTRATOR')) ? 'ADMINISTRATOR' : msg.guild.me.permissions.toArray());
    }
};