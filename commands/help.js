const Discord = require('discord.js');

module.exports = {
    help: {
        "name": ">help",
        "id": "help",
        "aliases": [
            "help"
        ],
        "desc": "Gets information about a command.",
        "example": ">help help"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: (bot, msg, args) =>
    {
        let helpInfo = require(`./${args[1]}.js`).help;
        let _ = new Discord.MessageEmbed({
            color: "black",
            title: `Help for command \`${args[1]}\``,
            description: "Here is all the available info I can find on that command.",
            "fields": [
                {
                    name: `Name`,
                    value: `\`\`\`\n${helpInfo.name}\`\`\``
                },
                {
                    name: `Description`,
                    value: `\`\`\`${helpInfo.desc}\`\`\``
                },
                {
                    name: 'Example',
                    value: `\`\`\`${helpInfo.example}\`\`\``
                }
            ]
        });
        msg.reply(_);
    }
};;;