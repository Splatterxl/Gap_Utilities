const Discord = require("discord.js");
const embeds = require('../assets/embeds');
const firebase = require('firebase');

// (new Discord.Client).on("messageUpdate", (n, o);

module.exports = {
    help: null,
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} oMsg 
     * @param {Discord.PartialMessage} nMsg 
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, nMsg, db) =>
    {
        if (msg.content === nMsg.content || msg.content === null) return;
        if ((!msg.guild) || (msg.guild == undefined) || (msg.channel.type === 'dm')) return;
        if (nMsg.content.includes('(╯°□°）╯︵ ┻━┻') || nMsg.content.includes('┻━┻︵╰(°□°╰)'))
        {

            msg.channel.send('┬─┬ ノ( ゜-゜ノ)  	');
        }
        // @ts-ignore
        if (!((await db.ref(`settings/${msg.guild.id}`).get()).val())) return;
        // @ts-ignore
        global.settings = require('../settings.json');
        ((...args) =>
        {
            if (!(msg.member === null)) { } else return;
            if (msg.member.displayName.startsWith('[AFK]')) 
            {
                let err = false;
                msg.member.setNickname(msg.member.displayName.slice(6)).catch(e => { err = true; });
                if (!err) msg.channel.send(embeds.afkRemove(msg));
            }
        })``;
        require('../assets/pinged').run(bot, msg);
        // @ts-ignore
        let args = nMsg.content.slice((require('../settings.json')).settings[msg.guild.id].prefix.length).split(/ +/);
        (function ()
        {
            if (msg.author.bot) return;
            if (nMsg.content == 'defsettingsforceplz')
            {

                db.ref(`settings/${msg.guild.id}`).set(db.ref('settings/default'));
                // @ts-ignore
                require('fs').writeFileSync('./settings.json', JSON.stringify(global.settings));
                msg.reply('default settings applied to this server!');
            } else if (nMsg.content === 'id') msg.reply(msg.channel.id);
            // @ts-ignore
            if (nMsg.content.startsWith((require('../settings.json').settings[msg.guild.id].prefix)))
            {
                // @ts-ignore
                try
                {
                    // @ts-ignore
                    global.cmds = (require('./commandLoader.js'))(true);
                    // @ts-ignore
                    if (!global.cmds.get(args[0]) || !global.cmds.get(args[0]).run) return;
                    // @ts-ignore
                    if (global.settings.blacklist.includes(msg.author.id)) return oMsg.channel.send(embeds.blacklisted());
                    // @ts-ignore
                    try { global.cmds.get(args[0]).run(bot, nMsg, args, db); }
                    catch (e) { msg.react('❌'); return msg.reply(`An error occurred in the MessageHandler for \`${nMsg.content}\`: \`\`\`\n${e}\`\`\``); } console.log(`triggered command`);
                } catch (err) { return nMsg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
            }
        })();
        if (msg.author.discriminator === '0000') return;
        // @ts-ignore

    }
};