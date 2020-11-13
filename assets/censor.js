const Discord = require("discord.js");

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} msg 
     */
    run: (bot, msg) =>
    {
        if (msg.content.toLowerCase().includes("china is bad"))
        {
            msg.delete();
            msg.reply(`your message has been deleted because it may have contained misinformation.`);
        }
        // if (msg.content.search(/((https)|(http))|():\/\/discord\.(com\/invite\/\w+)|(gg\/\w+)/g))
        // {
        //     msg.delete();
        //     msg.reply("you have posted a link in chat.");
        // }
    }
};