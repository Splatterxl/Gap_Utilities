const { settings } = require('cluster');
const Discord = require("discord.js");
let bannedWords = ["fuk", 'fuck', 'fuq', 'dafuq'];

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param { Discord.Message | Discord.PartialMessage } msg
     */
    run: (bot, msg) =>
    {
        if (msg.author.bot) return;
        // if (msg.content.split(/ +/).map(/discord\.((gg\/\w+)|(com\/invite\/\w+))/gi))
        // {
        //     msg.delete();
        //     msg.reply("you have posted a link in chat.");
        // }
        // @ts-ignore
        if (require('../settings.json').settings[msg.guild.id].bannedWords) { } else return;
        if (bannedWords.includes(msg.content.toLowerCase()))
        {
            msg.delete();
            return msg.reply(`your message has been deleted because it was a banned word.`);
        }
        bannedWords.forEach((value, index) =>
        {
            if (msg.content.toLowerCase().includes(value))
            {
                msg.delete();
                msg.reply(`your message has been deleted because it contained a banned word. | [${index}]`);
            }
        });
    }
};