let Discord = require("discord.js");

module.exports = {
    /**
     * @param {Discord.Message} msg
     */
    run: (bot, msg) =>
    {
        let args = msg.content.slice(1, msg.content.length).split(" ");
        if (msg.content.startsWith(">"))
        {
            // @ts-ignore
            let commandHandler = require(`../commands/${args[0]}`);
            commandHandler.run(bot, msg);
        }
    }
};