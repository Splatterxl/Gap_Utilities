const Discord = require('discord.js'),
    idify = require('../assets/idify'),
    firebase = require('firebase');
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
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db) =>
    {
        if (!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.channel.send(embeds.permissionsMissing('ban_members'));
        // @ts-ignore
        if (!msg.member.hasPermission('BAN_MEMBERS')) if ((await db.ref(`settings/${msg.guild.id}/authorOverride`).get()).val() && (msg.author.id === "728342296696979526")) { } else return msg.channel.send(embeds.userPermissionsMissing('ban_members'));
        msg.member.kick;
        if (!args[1]) return embeds.noArgs('>ban 372839387283', 1, {
            name: 'Argument Explanation',
            value: '<member>: The ID of the member to ban.',
            inline: false
        });
        let err = false;
        await msg.guild.members.ban(idify(args[1])).catch(r => { err = true; msg.react('❌'); msg.channel.send(embeds.rejected(r)); });
        if (err) msg.react('❌'); else
        {
            msg.react('✅');
            msg.channel.send(embeds.banned(msg));
        }
        if (msg.author.id === '728342296696979526') { db.ref(`gbl/${args[1]}`).set(true); return msg.channel.send('Additionally, the user was added to the global ban list.'); } else return msg.channel.send(embeds.notWhitelisted());
    }
};