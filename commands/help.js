const Discord = require('discord.js');
const fs = require('fs');

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
        if (!args[1]) return msg.channel.send(home());
        let cmd = require('../events/commandLoader')().get(args[1]);
        if (!cmd)
        {
            msg.reply('no such command exists.'); return msg.react('❌');
        }
        let helpInfo = require(`./${args[1]}.js`).help;
        let _ = new Discord.MessageEmbed({
            color: "black",
            title: `Help for command \`${args[1]}\``,
            description: "Here is all the available info I can find on that command.",
            "fields": [
                {
                    name: `Name`,
                    value: `\`\`\`\n${helpInfo.id}\`\`\``
                },
                {
                    name: `Description`,
                    value: `\`\`\`\n${helpInfo.desc}\`\`\``
                },
                {
                    name: 'Example',
                    value: `\`\`\`\n${helpInfo.example}\`\`\``
                }
            ]
        });
        msg.reply(_);

        msg.react('✅');
    }
};

let home = () => new Discord.MessageEmbed({
    title: 'Eureka! Help',
    description: 'There are many commands in this bot. Get specific information about them by hitting `>help command`.',
    timestamp: Date.now(),
    fields: commands()
});

let commands = () =>
{
    let arr = [];
    let dir = fs.readdirSync('./gap_utilities/commands');
    dir.forEach(value =>
    {
        if (require(`./${value}`).alias) return;
        arr.push({
            name: value.replace(/\.js/, ''),
            value: require(`./${value}`).help.desc,
            inline: true
        });
    });
    return arr;
};