
const Discord = require(`discord.js`);
// const { global } = require('node/globals.global');
let embeds = require('../assets/embeds');

module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     */
    run: async (bot, msg) =>
    {
        if (!msg.guild) return;
        if (msg.content.includes('(╯°□°）╯︵ ┻━┻') || msg.content.includes('┻━┻︵╰(°□°╰)'))
        {

            msg.channel.send('┬─┬ ノ( ゜-゜ノ)  	');
        }
        // @ts-ignore
        if (!global.settings.settings[msg.guild.id].prefix)
        {
            // @ts-ignore
            global.settings.settings[msg.guild.id].prefix = '>';
            // @ts-ignore
            // @ts-ignore
            require('fs').writeFileSync('./settings.json', JSON.stringify(global.settings));
            msg.channel.send('As there is no server prefix, I changed it to `>`.');
            // @ts-ignore
        }
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
        require("../assets/censor.js").run(bot, msg);
        require('../assets/pinged').run(bot, msg);
        // @ts-ignore
        let args = msg.content.slice((require('../settings.json')).settings[msg.guild.id].prefix.length).split(/ +/);
        (function ()
        {

            if (msg.content == 'defsettingsforceplz')
            {
                // @ts-ignore
                global.settings = require('../settings.json');
                // @ts-ignore
                global.settings.settings[msg.guild.id] = settings.settings.default;
                // @ts-ignore
                require('fs').writeFileSync('./settings.json', JSON.stringify(global.settings));
                msg.reply('default settings applied to this server!');
            } else if (msg.content == 'id') msg.reply(msg.channel.id);
            // @ts-ignore
            if (msg.content.startsWith((require('../settings.json').settings[msg.guild.id].prefix)))
            {
                // @ts-ignore
                if (global.settings.blacklist.includes(msg.author.id)) return msg.channel.send(embeds.blacklisted());
                try
                {
                    // @ts-ignore
                    global.cmds = (require('./commandLoader.js'))(true);
                    // @ts-ignore
                    if (!global.cmds.get(args[0]) || !global.cmds.get(args[0]).run) return;
                    // @ts-ignore
                    try { global.cmds.get(args[0]).run(bot, msg, args); }
                    catch (e) { msg.react('❌'); return msg.reply(`An error occurred in the MessageHandler for \`${msg.content}\`: \`\`\`\n${e}\`\`\``); } console.log(`triggered command`);
                } catch (err) { return msg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
            }
        })();
        if (msg.author.discriminator === '0000') return;
        // @ts-ignore
        return console.log(`[MESSAGE] User ${msg.author.username}#${msg.author.discriminator} sent message \`${msg.content}\` ${(msg.guild) ? `in channel '${msg.channel.name}', server '${msg.guild.name}' (ID ${msg.guild.id})}` : `in a DM to ${bot.user.username}.`}`);
    }
};