
const Discord = require(`discord.js`);

module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     */
    run: (bot, msg) =>
    {
        require("../assets/autoReply").run(bot, msg);
        require("../assets/censor.js").run(bot, msg);
        let args = msg.content.slice(1).split(/ +/);
        (function ()
        {

            if (msg.content.startsWith(`>`))
            {
                try
                {
                    let cmds = require('./commandLoader');
                    if (!cmds.get(args[0]) || !cmds.get(args[0]).run) return;
                    try { cmds.get(args[0]).run(bot, msg, args); }
                    catch (e) { msg.react('❌'); return msg.reply(`An error occurred in the MessageHandler for \`${msg.content}\`: \`\`\`\n${e}\`\`\``); } console.log(`triggered command`);
                } catch (err) { return msg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
            }
        })();
        if (msg.author.discriminator === '0000') return;
        // @ts-ignore
        return console.log(`[MESSAGE] ${(msg.author.bot) ? "Bot" : "User"} ${msg.author.username}#${msg.author.discriminator} sent message \`${msg.content}\` ${(msg.guild) ? `in channel '${msg.channel.name}', server '${msg.guild.name}' (ID ${msg.guild.id})}` : `in a DM to ${bot.user.username}.`}`);
    }
};