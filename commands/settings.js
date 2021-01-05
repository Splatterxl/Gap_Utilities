const Discord = require('discord.js');
let embeds = require('../assets/embeds');


module.exports = {
    help: {
        "name": ">settings",
        "id": "settings",
        "aliases": [
            "setting",
            "settings",
            "config",
            "set"
        ],
        "desc": "[WIP] Sets default settings.",
        "example": ">settings default",
        "whitelisted": false,
        "category": "config"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db) =>
    {
        if (!msg.member.hasPermission('MANAGE_GUILD'))
            // @ts-ignore
            if ((await db.ref(`settings/${msg.guild.id}/authorOverride`).get()).val() && (msg.author.id === "728342296696979526")) { }
            else
            {
                msg.react('❌');
                let mw = await msg.channel.send(embeds.userPermissionsMissing('manage_guild'));
                return setTimeout(async () =>
                {
                    mw.delete();
                    return msg.delete().catch(e => null);

                }, 5000);
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
                    let settings = require('../settings.json');

                    db.ref(`settings/${msg.guild.id}`).set(settings.settings.default);
                    return msg.reply('default settings applied to this server!');
                case 'prefix':
                    if (!args[2]) return msg.channel.send('WTF dude, no prefix?!');
                    db.ref(`settings/${msg.guild.id}/prefix`).set(args.slice(2).join(' '));
                    return msg.reply('server prefix changed to `' + args.slice(2).join(' ') + '`');

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
