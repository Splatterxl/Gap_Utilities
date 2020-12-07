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
        if (!msg.member.hasPermission('MANAGE_GUILD'))
            // @ts-ignore
            if (((require("../settings.json").settings[msg.guild.id].authorOverride)) && (msg.author.id === "728342296696979526")) { }
            else
            {
                msg.react('❌');
                let mw = await msg.channel.send(embeds.userPermissionsMissing('manage_guild'));
                mw.delete({
                    timeout: 2500,
                    reason: 'Delete unallowed command.'
                });
                return msg.delete({
                    timeout: 5000,
                    reason: 'Delete unallowed command.'
                });
            };
        if (!args[1]) return msg.channel.send(embeds.noArgs('>settings default', 1, {
            name: 'Argument Explanation',
            value: 'Required Arguments are signified by `<>`, optional ones by `[]`.\n```\n<type>: The type of command to execute. Currently only supports \'default\'.```',
            inline: true
        }));

        try
        {
            switch (args[1].toLowerCase())
            {
                case 'default':
                    // @ts-ignore
                    global.settings = require('../settings.json');
                    // @ts-ignore
                    global.settings.settings[msg.guild.id] = settings.settings.default;
                    // @ts-ignore
                    require('fs').writeFileSync('./gap_utilities/settings.json', JSON.stringify(global.settings));
                    return msg.reply('default settings applied to this server!');
                case 'prefix':
                    if (!args[2]) return msg.channel.send('WTF dude, no prefix?!');
                    // @ts-ignore
                    // @ts-ignore
                    global.settings = require('../settings.json');
                    // @ts-ignore
                    global.settings.settings[msg.guild.id].prefix = args.slice(2).join(' ');
                    // @ts-ignore
                    require('fs').writeFileSync('./gap_utilities/settings.json', JSON.stringify(global.settings));
                    return msg.reply('server prefix changed to `' + args.slice(2).join(' ') + '`');
                case 'logChan':
                case 'prefix':
                    if (!args[2]) return msg.channel.send('WTF dude, no channe;?!');
                    // @ts-ignore
                    // @ts-ignore
                    global.settings = require('../settings.json');
                    // @ts-ignore
                    global.settings.settings[msg.guild.id].logChan = args[1];
                    // @ts-ignore
                    require('fs').writeFileSync('./settings.json', JSON.stringify(global.settings));
                    return msg.reply('log channel changed to <#' + args[1] + '>');
                case 'log':
                case 'prefix':
                    if (!args[2]) return msg.channel.send('WTF dude, no settings?!');
                    // @ts-ignore
                    // @ts-ignore
                    global.settings = require('../settings.json');
                    // @ts-ignore
                    global.settings.settings[msg.guild.id].log = (args[1] == 'false') ? false : true;
                    // @ts-ignore
                    require('fs').writeFileSync('./settings.json', JSON.stringify(global.settings));
                    return msg.reply('server prefix changed to `' + (args[1] == 'false') ? false : true + '`');
                default:
                    return msg.channel.send(embeds.noArgs('>settings default', 1, {
                        name: 'Argument Explanation',
                        value: 'Required Arguments are signified by `<>`, optional ones by `[]`.\n```\n<type>: The type of command to execute. Currently only supports \'default\'.```',
                        inline: true
                    }));
            }
        } catch (e) { return msg.channel.send(embeds.rejected(e)); }
    }
};