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
        if (msg.author !== null && msg.author.bot) return;
        // @ts-ignore
        if (msg.content.includes(`<@${bot.user.id}>`) || msg.content.includes(`<@!${bot.user.id}>`)) return msg.reply('Sup, iirc my prefix in this server is `' + global.settings.settings[msg.guild.id].prefix + '`, but idk, someone might have changed it.');
    }
};

