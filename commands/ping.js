const Discord = require('discord.js');

module.exports = {
    help: {
        "name": ">ping",
        "id": "eval",
        "aliases": [
            "ping",
            "pong"
        ],
        "desc": "Test if the bot is online!",
        "example": ">ping"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        let msgF = (await msg.channel.send("Getting Latencies..."));
        let when = Date.now();

        let msgLatency = (await msgF.edit('Got latencies!')).editedTimestamp - msgF.createdTimestamp;
        let _ = new Discord.MessageEmbed()
            .setTitle("🏓 Pong!")
            .setColor("red")
            .setDescription("The bot is online!")
            .addField("WebSocket Latency", `\`\`\`js\n${bot.ws.ping}\`\`\``)
            .addField("Edit Latency", `\`\`\`js\n${msgLatency}\`\`\``);

        msgF.edit([`There is an embed attached to this message. If you can't see it, check your settings under \`Text and Images\`. If you can't see it after that, an admin may have deleted the embed.`, _]);
    }
};;;