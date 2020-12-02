const Discord = require("discord.js");

module.exports = {
    help: null,
    /**
    *
    * @param {Discord.Client} bot
    * @param {Discord.Message | Discord.PartialMessage} msg
    */
    run: (bot, msg) =>
    {
        if (msg.content.includes('<@732195153078648894>') || msg.content.includes('<@!732195153078648894>')) return msg.reply('my prefix in this server is `' + global.settings.settings[msg.guild.id].prefix + '`');
    }
};

