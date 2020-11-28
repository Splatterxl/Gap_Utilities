const Discord = require('discord.js');

module.exports = {
    help: {
        "name": ">whois",
        "id": "whois",
        "whitelisted": false,
        "aliases": [
            "role"
        ],
        "desc": "Coming Soon!",
        "example": ">whois 13802482938501"
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
            title: "User Statistics",
            description: "This person better be ready for this!",
            fields: [
                {
                    name: "Coming soon",
                    value: "```This feature is coming soon.```"
                }
            ]
        });
        msg.channel.send(_);
        msg.react('❌');
    }
};;;