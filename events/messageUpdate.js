const Discord = require("discord.js");
const embeds = require('../assets/embeds');

// (new Discord.Client).on("messageUpdate", (n, o);

module.exports = {
    help: null,
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} oMsg 
     * @param {Discord.PartialMessage} nMsg 
     */
    run: async (bot, oMsg, nMsg) =>
    {
        if (oMsg.content === nMsg.content) return;
        require("../assets/censor.js").run(bot, nMsg);
        require('../assets/pinged').run(bot, nMsg);
        const args = nMsg.content.slice(global.settings.settings[oMsg.guild.id].prefix.length).split(/ +/);
        if (nMsg.content.startsWith(global.settings.settings[oMsg.guild.id].prefix))
        {
            try
            {
                let cmds = require('./commandLoader')();
                try { await cmds.get(args[0]).run(bot, nMsg, args); console.log(`triggered command`); } catch (e) { msg.channel.send(embeds.rejected(e)); }
            } catch (err) { return nMsg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
        }
        (require('./log'))(bot, null, oMsg.guild, '', 'edit', { o: oMsg, n: nMsg });

    }
};