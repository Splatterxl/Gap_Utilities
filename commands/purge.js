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
    run: async (bot, msg, args) =>
    {

        if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(embeds.permissionsMissing('manage_messages'));
        if (!msg.member.hasPermission('MANAGE_MESSAGES'))
            // @ts-ignore
            if (((require("../settings.json").settings[msg.guild.id].authorOverride)) && (msg.author.id === "728342296696979526")) { }
            else
            {
                msg.react('❌');
                let mw = await msg.channel.send(embeds.userPermissionsMissing('manage_messages'));
                mw.delete({
                    timeout: 2500,
                    reason: 'Delete unallowed command.'
                });
                return msg.delete({
                    timeout: 5000,
                    reason: 'Delete unallowed command.'
                });
            };
        let purgeNumber = parseInt(args[1]);

        if (!purgeNumber) return msg.reply('please specify a number of messages to purge.');

        // @ts-ignore
        msg.channel.bulkDelete(purgeNumber + 1);
    }
};;;