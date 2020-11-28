const Discord = require('discord.js');

module.exports = {
    help: {
        "name": ">role",
        "id": "role",
        "aliases": [
            "role"
        ],
        "desc": "Coming Soon!",
        "example": ">role add 36811510864111206 10299382993849283"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: (bot, msg, args) =>
    {
        let _ = new Discord.MessageEmbed({
            color: "black",
            title: "This command is coming soon!",
            description: "This command is currently under construction!"
        });
        msg.channel.send(_);

        msg.react('❌');
    }
};;;