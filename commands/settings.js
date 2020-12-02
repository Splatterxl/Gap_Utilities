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


        try
        {
            switch (args[1].toLowerCase())
            {
                case 'default':
                    global.settings = require('../settings.json');
                    global.settings.settings[msg.guild.id] = settings.settings.default;
                    require('fs').writeFileSync('./settings.json', JSON.stringify(settings));
                    return msg.reply('default settings applied to this server!');
                case 'prefix':
                    global.settings = require('../settings.json');
                    global.settings.settings[msg.guild.id].prefix = args[2];
                    require('fs').writeFileSync('./settings.json', JSON.stringify(settings));
                    return msg.reply('server prefix changed to `' + args[2] + '`');
                default:
                    return msg.channel.send(embeds.noArgs('>settings default', 1, {
                        name: 'Argument Explanation',
                        value: 'Required Arguments are signified by `<>`, optional ones by `[]`.\n```\n<type>: The type of command to execute. Currently only supports \'default\'.```',
                        inline: true
                    }));
            }
        } catch (e) { return msg.channel.send(embeds.rejected(e)); }
        global.settings = require('../settings.json');
    }
};