
const Discord = require(`discord.js`);

module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     */
    run: (bot, msg) =>
    {
        let args = msg.content.slice(1, msg.content.length).split(` `);
        if (msg.content.startsWith(`>`))
        {
            // @ts-ignore
            let commandHandler = require(`../commands/${args[0]}`);
            try { commandHandler.run(bot, msg); console.log(`triggered command`); } catch (e) { }
        }

        console.log(`User ${msg.author.username}#${msg.author.discriminator} sent message \`${msg.content}\` ${(msg.guild) ? `in server ${msg.guild.name} (ID ${msg.guild.id})}` : `in a DM.`}`);
    }
};