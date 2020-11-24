const Discord = require("discord.js");

// (new Discord.Client).on("messageUpdate", (n, o);

module.exports = {
    help: null,
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} oMsg 
     * @param {Discord.PartialMessage} nMsg 
     */
    run: (bot, oMsg, nMsg) =>
    {
        if (oMsg.content === nMsg.content) return;
        require("../assets/autoReply").run(bot, nMsg);
        require("../assets/censor.js").run(bot, nMsg);
        let args = nMsg.content.slice(1).split(/ +/);
        if (nMsg.content.startsWith(`>`))
        {
            try
            {
                let cmds = require('./commandLoader');
                try { cmds.get(args[0]).run(bot, nMsg, args); console.log(`triggered command`); } catch (e) { }
            } catch (err) { return nMsg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
        }

        return console.log(`${(oMsg.author.bot) ? "Bot" : "User"} ${oMsg.author.username}#${oMsg.author.discriminator} edited message \`${oMsg.content}\` to \`${nMsg.content}\` ${(oMsg.guild) ? `in server ${oMsg.guild.name} (ID ${oMsg.guild.id})}` : `in a DM to ${bot.user.username}.`}`);
    }
};