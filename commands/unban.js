const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">unban",
        "id": "unban",
        "aliases": [
            "unban"
        ],
        "desc": "Unbans a user from the guild.",
        "example": ">unban 92471037298547"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args, db) =>
    {
        if (!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.channel.send(embeds.permissionsMissing('ban_members'));
        // @ts-ignore
        if (!msg.member.hasPermission('BAN_MEMBERS')) if ((await db.ref(`settings/${msg.guild.id}/authorOverride`).get()).val() && (msg.author.id === "728342296696979526")) { } else return msg.channel.send(embeds.userPermissionsMissing('ban_members'));
        msg.member.kick;
        if (!args[1]) return embeds.noArgs('>unban @Splatterxl#8999', 1, {
            name: 'Argument Explanation',
            value: '<member>: The ID of the member to unban.',
            inline: false
        });
        let err = false;
        msg.guild.members.unban(args[1]).catch(r => { err = true; msg.react('❌'); return msg.channel.send(embeds.rejected(r)); });
        msg.react('✅');

    }
};
