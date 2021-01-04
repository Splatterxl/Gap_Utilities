
const Discord = require(`discord.js`);
// const { global } = require('node/globals.global');
let embeds = require('../assets/embeds');

module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, db) =>
    {
        if ((!msg.guild) || (msg.guild == undefined) || (msg.channel.type === 'dm')) return;


        if (!((await db.ref(`settings/${msg.guild.id}`).get()).val())) {
           db.ref(`settings/${msg.guild.id}`).set(global.settings.settings.default);
           

        };
        (async (...args) =>
        {
            if (!(msg.member === null)) { } else return;
            if (msg.member.displayName.startsWith('[AFK]') || (await db.ref(`afk/${msg.guild.id}/${msg.author.id}`).get()).val()) 
            {
                // msg.member.setNickname(msg.member.displayName.startWith('[AFK]') ? msg.member.displayName.slice(6) : msg.member.displayName).catch(e => null);
                msg.channel.send(embeds.afkRemove(msg));
                db.ref(`afk/${msg.guild.id}/${msg.author.id}`).remove();
            }
        })``;
        require('../assets/pinged').run(bot, msg, db);
        let flags = require("../assets/flags")(msg.content);
        
        // @ts-ignore
        let args = msg.content.slice((await db.ref(`settings/${msg.guild.id}/prefix`).get()).val().length).split(/ +/);
        (async function ()
        {
            if (msg.author.bot) return;
            if (msg.content == 'defsettingsforceplz')
            {

                db.ref(`settings/${msg.guild.id}`).set((await db.ref('settings/default').get()).val());

                msg.reply('default settings applied to this server!');
            } else if (msg.content == 'id') msg.reply(msg.channel.id);
            // @ts-ignore
            if (msg.content.startsWith((await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()))
            {
                // @ts-ignore
                try
                {
                    // @ts-ignore
                    if (!global.cmds.get(args[0]) || !global.cmds.get(args[0]).run) {
                      return global.cmds.find(v=>v.aliases?.includes(args[0]))?.run(bot,msg,args,db,flags)
                    };
                   // @ts-ignore
                    if (global.settings.blacklist.includes(msg.author.id)) return msg.channel.send(embeds.blacklisted());
                    // @ts-ignore
                    try { global.cmds.get(args[0]).run(bot, msg, args, db, flags); }
                    catch (e) { msg.react('❌'); return msg.reply(`An error occurred in the MessageHandler for \`${msg.content}\`: \`\`\`\n${e}\`\`\``); } console.log(`triggered command`);
                } catch (err) { return msg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
            } else if (msg.author.id === '728342296696979526')
            {
                args = msg.content.split(/ +/);
                // @ts-ignore
                try
                {

                    // @ts-ignore
                    if (!global.cmds.get(args[0]) || !global.cmds.get(args[0]).run) return;
                    // @ts-ignore
                    // @ts-ignore
                    try { await global.cmds.get(args[0]).run(bot, msg, args, db, flags); }
                    catch (e) { msg.react('❌'); return msg.reply(`An error occurred in the MessageHandler for \`${msg.content}\`: \`\`\`\n${e}\`\`\``); } console.log(`triggered command`);
                } catch (err) { return msg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
            }
        })();
        if (msg.author.discriminator === '0000') return;
        // @ts-ignore
        if (require("os").platform == "linux") return;
        return console.log(`[MESSAGE] User ${msg.author.username}#${msg.author.discriminator} sent message \`${msg.content}\` ${(msg.guild) ? `in channel '${msg.channel.name}', server '${msg.guild.name}' (ID ${msg.guild.id})}` : `in a DM to ${bot.user.username}.`}`);
    }
};
