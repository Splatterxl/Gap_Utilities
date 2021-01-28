const Discord = require('discord.js');
let embeds = require('../misc/embeds');


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
    run: async (bot, msg, args, db, flags, ctx) =>
    {
        if (!msg.member.hasPermission('MANAGE_GUILD'))
            // @ts-ignore
            if (msg.author.id != "728342296696979526")
            {
                ctx.respond(embeds.userPermissionsMissing('manage_guild'))
            };
        if (!args[1] || !args[2]) return ctx.respond("You need to provide a key and a value. Example: `settings prefix e;`");
        switch (args[1].toLowerCase())
            {
                case 'prefix':
                    
                    db.set(`settings.g${msg.guild.id}.prefix`, args.slice(2).join(' '));
                    return ctx.respond('Server prefix changed to `' + args.slice(2).join(' '))
            }
    }
};
