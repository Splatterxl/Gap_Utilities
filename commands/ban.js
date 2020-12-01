const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">ban",
        "id": "ban",
        "aliases": [
            "execute",
            "ban"
        ],
        "desc": "Ban members of the server.",
        "example": ">ban 770232718339604522"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.channel.send(embeds.permissionsMissing('ban_members'));
        // @ts-ignore
        if (!msg.member.hasPermission('BAN_MEMBERS')) if (((require("../settings.json").settings[msg.guild.id].authorOverride)) && (msg.author.id === "728342296696979526")) { } else return msg.channel.send(embeds.userPermissionsMissing('ban_members'));
        msg.member.kick;
        if (!args[1]) return embeds.noArgs('>ban @Splatterxl#8999', 1, {
            name: 'Argument Explanation',
            value: '<member>: The ID of the member to ban.',
            inline: false
        });
        let err = false;
        await msg.guild.members.ban(args[1]).catch(r => { err = true; msg.react('❌'); return msg.channel.send(embeds.rejected(r)); });
        if (err) return;
        msg.react('✅');
        msg.channel.send(embeds.banned(msg));
    }
};