
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
        if (msg.content.startsWith(`>`))
        {
            try
            {
                let commandHandler = require(`../commands/${args[0]}`);
                try { commandHandler.run(bot, msg); console.log(`triggered command`); } catch (e) { }
            } catch (e) { msg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${e}\`\`\``); }
        }

        console.log(`${(msg.author.bot) ? "Bot" : "User"} ${msg.author.username}#${msg.author.discriminator} sent message \`${msg.content}\` ${(msg.guild) ? `in server ${msg.guild.name} (ID ${msg.guild.id})}` : `in a DM to ${bot.user.username}.`}`);
    }
};