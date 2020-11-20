const Discord = require("discord.js");
let bannedWords = ["f"];

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} msg 
     */
    run: (bot, msg) =>
    {
        if (bannedWords.includes(msg.content.toLowerCase()))
        {
            msg.delete();
            msg.reply(`your message has been deleted because it contained a banned word.`);
        }
        // if (msg.content.search(/((https)|(http))|():\/\/discord\.(com\/invite\/\w+)|(gg\/\w+)/g))
        // {
        //     msg.delete();
        //     msg.reply("you have posted a link in chat.");
        // }
    }
};