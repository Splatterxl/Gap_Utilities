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
        if (msg.author.bot || !msg.guild)
            return;
        else
            console.log(`User ${msg.author.username}#${msg.author.discriminator} sent message "${msg.content}" in server ${msg.guild.name} (ID ${msg.guild.id})`);
    }
};