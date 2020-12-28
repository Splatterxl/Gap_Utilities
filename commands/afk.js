const Discord = require('discord.js'),
    firebase = require('firebase');
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">pafk",
        "id": "afk",
        "aliases": [
            "afk"
        ],
        "desc": "Set an afk status for you. Use `>afk` again to un-afk.",
        "example": ">afk"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db) =>
    {
        console.log(((await (db.ref(`afk/${msg.guild.id}`).get())).val())[`${msg.author.id}`]);
        try
        {
            let canSetNickname = true;
            if (!(msg.guild.me.hasPermission('MANAGE_NICKNAMES'))) canSetNickname = false;
            if (msg.member.displayName.startsWith('[AFK]') && canSetNickname) 
            {
                msg.member.setNickname(msg.member.displayName.slice(6)).catch(e => { });
                // @ts-ignore
                msg.channel.send(embeds.afkRemove(msg));
            }
            if (msg.member.displayName.startsWith('[AFK]')) return;


            db.ref(`afk/${msg.guild.id}/${msg.author.id}`).set((args[1]) ? args.slice(1).join(' ') : 'No reason specified.');


            msg.reply(new Discord.MessageEmbed({
                title: 'Done!',
                description: `You have been set AFK for: \`\`\`\n${args[1] ? args.slice(1).join(' ') : 'No reason specified'}\`\`\``
            }));
        } catch (e) { console.log(e); }
    }
};
