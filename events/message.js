
const { settings } = require('cluster');
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
        if (msg.content.includes('(╯°□°）╯︵ ┻━┻') || msg.content.includes('┻━┻︵╰(°□°╰)'))
        {

            msg.channel.send('┬─┬ ノ( ゜-゜ノ)  	');
        }
        if (!global.settings.settings[msg.guild.id].prefix)
        {
            global.settings.settings[msg.guild.id].prefix = '>';
            require('fs').writeFileSync('./gap_utilities/settings.json', JSON.stringify(settings));
            msg.reply('server prefix changed to `>`');
        }
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
        let args = msg.content.slice((require('../settings.json')).settings[msg.guild.id].prefix.length).split(/ +/);
        (function ()
        {

            if (msg.content.startsWith((require('../settings.json').settings[msg.guild.id].prefix)))
            {
                try
                {
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