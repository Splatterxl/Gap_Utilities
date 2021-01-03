
const Discord = require('discord.js');
e!!eval const fs=require("fs"),path=require("path"), cmds = fs.readdirSync(path.join(__dirname)).map(v=>(v=="help.js")?module.exports.help:require(`./${v}`).help); const categories = cmds.map(v=>[v?.id, v?.category]);
const catL = {"moderation":[], "anime":[], "utility":[], "whitelisted":[], "bot":[]};
   categories.forEach(v=>v[1]?catL[v[1].toLowerCase()][catL[v[1].toLowerCase()].length]=(v[0]):undefined); console.log(categories)
module.exports = {
    help: {
        "name": ">help",
        "id": "help",
        "aliases": [
            "help"
        ],
"category":"utility",
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
        // @ts-ignore
        let cmd = global.cmds.get(args[1]);

        if (!cmd)
        {
            if (!category([args[1]]))
            {
                return (() => { msg.reply('No such command exists or it has been privated by my owner.'); msg.react('❌'); })();
            }
            else
            {
                return msg.reply(category(args[1]));
            }
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
    description: 'There are many commands in this bot. Get specific information about them by hitting `>help <command|category>`.',
    timestamp: Date.now(),
    fields: commands()
});

let commands = () =>
{
   
    let arr = [{
        name: 'Moderation',
        value: catL.moderation.length,
        inline: true
    }, {
        name: 'Anime',
        value: catL.anime.length,
        inline: true
    }, {
        name: 'Utility',
        value: catL.utility.length,
        inline: true
    }, {
        name: 'Whitelisted',
        value: catL.whitelisted.length,
        inline: true
    }, {
        name: "Bot",
        value: catL.bot.length,
        inline: true
    }];

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
            fields: [{
                name: 'Commands for ' + args,
                value: `\`${catL[args].join('`, `')}\``
            }]
        })
        : null
        ;
}
