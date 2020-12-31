const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">purge",
        "id": "purge",
        "aliases": [
            "purge",
            'p'
        ],
        "desc": "Purges messages from the channel.",
        "example": ">purge 10"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args, db) =>
    {

        if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(embeds.permissionsMissing('manage_messages'));
        if (!msg.member.hasPermission('MANAGE_MESSAGES'))
            
            if ((await db.ref(`settings/${msg.guild.id}/authorOverride`).get()).val() && (msg.author.id === "728342296696979526")) { }
            else
            {
                msg.react('❌');
                let mw = await msg.channel.send(embeds.userPermissionsMissing('manage_messages'));
                return setTimeout(()=>{mw.delete();
                return msg.delete();}, 5000)
            };
        let purgeNumber = parseInt(args[1]);

        if (!purgeNumber) return msg.reply('Please specify a number of messages to purge.');
        if (purgeNumber >= 100) return msg.reply('I can only purge 99 messages at a time.');

        // @ts-ignore
        msg.channel.bulkDelete(purgeNumber + 1);
    }
};;;
