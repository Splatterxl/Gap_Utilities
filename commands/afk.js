const Discord = require('discord.js');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">pafk",
        "id": "afk",
        "aliases": [
            "afk"
        ],
        "desc": "Set an afk status for you.",
        "example": ">afk"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (msg.member.displayName.startsWith('[AFK]')) return;
        if (!(msg.guild.me.hasPermission('MANAGE_NICKNAMES'))) return msg.channel.send(embeds.permissionsMissing('manage_nicknames'));
        try { msg.member.setNickname(`[AFK] ${(msg.member.displayName)}`).catch(e => { msg.channel.send(embeds.rejected(e)); }); } catch (e) { msg.reply(embeds.rejected(e)); }
    }
};