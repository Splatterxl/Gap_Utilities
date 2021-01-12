const Discord = require('discord.js');
const idify = require('../misc/idify');
let embeds = require('../misc/embeds');

module.exports = {
    help: {
        "name": ">ban",
        "id": "ban",
        "aliases": [
            "execute",
            "ban",
            "bend"
        ],
        "desc": "Ban members of the server.",
        "example": ">ban 770232718339604522",
        "category": "moderation",
        "whitelisted": false
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
        if (!msg.member.hasPermission('BAN_MEMBERS')) if ((await db.ref(`settings/${msg.guild.id}/authorOverride`).get()).val() && (msg.author.id === "728342296696979526")) { } else
        {
            const mw = await msg.channel.send(embeds.userPermissionsMissing('ban_members')); setTimeout(() =>
            {
                mw.delete();
                return msg.delete().catch(e => null);
            }, 5000);
        }
        msg.member.kick;
        if (!args[1]) return embeds.noArgs('>ban 372839387283', 1, {
            name: 'Argument Explanation',
            value: '<member>: The ID of the member to ban.',
            inline: false
        });
        let err = false;
        await msg.guild.members.ban(idify(args[1])).catch(r => { err = true; msg.react('❌'); return msg.channel.send(embeds.rejected(r)); });
        if (err) return;
        msg.react('✅');
        msg.channel.send(embeds.banned(msg));
    }
};
