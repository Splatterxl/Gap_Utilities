const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">settings",
        "id": "settings",
        "aliases": [
            "setting",
            "settings"
        ],
        "desc": "[WIP] Sets default settings.",
        "example": ">settings default"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if ((!(args[1])) || (!(args[1].toLowerCase() == 'default'))) return msg.channel.send(embeds.noArgs('>settings default', 1, {
            name: 'Argument Explanation',
            value: 'Required Arguments are signified by `<>`, optional ones by `[]`.\n```\n<type>: The type of command to execute. Currently only supports \'default\'.```',
            inline: true
        }));
    }
};;;