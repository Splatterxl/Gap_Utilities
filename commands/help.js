
const Discord = require('discord.js');
const fs = require("fs"), path = require("path"), cmds = fs.readdirSync(path.join(__dirname)).map(v => (v == "help.js") ? module.exports.help : require(`./${v}`).help); const categories = cmds.map(v => [v?.id, v?.category]);
const catL = { "moderation": [], "fun": [], "utility": [], "owner": [], "bot": [], "imagegen": [], "config": [] };
categories.forEach(v => v[1] ? catL[v[1].toLowerCase()][catL[v[1].toLowerCase()].length] = (v[0]) : undefined);
module.exports = {
    help: {
        "name": ">help",
        "id": "help",
        "aliases": [
            "help",
            "halp",
            "h"
        ],
        "category": "bot",
        "desc": "Gets information about a command.",
        "example": ">help help",
        "whitelisted": false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: (bot, msg, args) =>
    {
        if (!args[1]) return msg.channel.send(home());
        // @ts-ignore
        let cmd = global.cmds.find(c => c.help?.id == args[1] || c.help?.aliases?.includes(args[1]));

        if (!cmd)
        {
            if (!category([args[1]]))
            {
                return (() => { msg.reply('No such command exists or it has been privated by my owner.'); msg.react('❌'); })();
            }
            else
            {
                return msg.reply(category(args[1]?.toLowerCase()));
            }
        }
        let helpInfo = cmd.help;
        let _ = new Discord.MessageEmbed({
            color: "YELLOW",
            title: `Help for command \`${args[1]}\``,
            description: "Here is all the available info I can find on that command.",
            "fields": [
                {
                    name: `Name`,
                    value: helpInfo.id
                },
                {
                    name: `Description`,
                    value: helpInfo.desc
                },
                {
                    name: 'Example',
                    value: helpInfo.example
                }, { name: "Aliases", value: "`" + helpInfo.aliases.join("`, `") + "`" }, { name: "Category", value: helpInfo.category }
            ]
        });
        msg.reply(_);

        msg.react('✅');
    }
};

let home = () => new Discord.MessageEmbed({
    title: 'Eureka! Help',
    description: 'There are many commands in this bot. Get specific information about them by hitting `>help <command|category>`.',
    timestamp: Date.now(),
    fields: commands(),
    color: "YELLOW"
});

let commands = () =>
{

    let arr = [{
        name: 'Moderation',
        value: `${catL.moderation.length} Commands, do \`help moderation\``,
        inline: true
    }, {
        name: 'Fun',
        value: `${catL.fun.length} Commands, do \`help fun\``,
        inline: true
    }, {
        name: 'Utility',
        value: `${catL.utility.length} Commands, do \`help utility\``,
        inline: true
    }, {
        name: 'Owner',
        value: `${catL.owner.length} Commands, do \`help owner\``,
        inline: true
    }, {
        name: "Bot",
        value: `${catL.bot.length} Commands, do \`help bot\``,
        inline: true
    }, {
        name: "Image Generation",
        value: `${catL.imagegen.length} Commands, do \`help imagegen\``
    }, {
        name: "Configuration",
        value: `${catL.config.length} Commands, do \`help config\``
    }
    ];

    return arr;
};

/**
 * 
 * @param {string} args
 * @returns {Discord.MessageEmbed}
 */
function category(args)
{
    return (catL[args])
        ? new Discord.MessageEmbed({
            title: 'Eureka! Help',
            color: "YELLOW",
            fields: [{
                name: 'Commands for ' + args,
                value: `\`${catL[args].join('`, `')}\``
            }]
        })
        : null
        ;
}
