
const Discord = require('discord.js');
const fs = require("fs"), path = require("path"), cmds = fs.readdirSync(path.join(__dirname)).filter(v => v.endsWith('.js')).map(v => (v == "help.js") ? module.exports.help : require(`./${v}`).help); const categories = cmds.map(v => [v?.id, v?.category]);
const catL = {};
categories.forEach(v => { if (v[1] && v[1] in catL == false) catL[v[1].toLowerCase()] = []; v[1] ? catL[v[1].toLowerCase()].push(v[0]) : undefined; });
// categories = global.cmds.map(v => [v.help?.id, v.help?.category])
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
    run: async (bot, msg, args, db) =>
    {
        if (!args[1]) return msg.channel.send(await home((await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()));
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
                    value: helpInfo.example?.replace(/>/, (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val())
                }, { name: "Aliases", value: helpInfo.aliases ? helpInfo.aliases.map(v => `\`${v}\``).join(", ") : "None." }, { name: "Category", value: helpInfo.category }
            ]
        });
        msg.reply(_);

        msg.react('✅');
    }
};

let home = async (prefix) => new Discord.MessageEmbed({
    title: 'Eureka! Help',
    description: 'There are many commands in this bot. Get specific information about them by hitting `' + prefix + 'help <command|category>`.',
    timestamp: Date.now(),
    fields: commands(),
    color: "YELLOW"
});

let commands = () =>
{

    let arr = Object.keys(catL).map(v => ({ name: [...v].map((v, i, a) => i == 0 || a[i - 1] == " " ? v.toUpperCase() : v).join(''), value: catL[v].map(v => `\`${v}\``).length + ` command${catL[v].length > 1 ? 's' : ''}.`, inline: true }));

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
