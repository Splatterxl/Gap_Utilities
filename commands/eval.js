/* eslint-disable @typescript-eslint/no-var-requires */
const error = require("../misc/Error");
let embeds = require('../misc/embeds');
let whitelist = require('../whitelist');
const hastebin = require('hastebin-gen');
const { inspect } = require("util");
const err = require('../misc/errorHandler');
const Discord = require("discord.js");


module.exports = {
    help: {
        "name": ">eval",
        "id": "eval",
        "aliases": [
            "test",
            "eval",
            "jseval",
            "jstest",
            "e"
        ],
        "desc": "A little evaluation command! (Restricted to owner.)",
        "example": ">eval console.log(\"An Example.\")",
        "category": "owner",
        "whitelisted": true
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db, flags) =>
    {
        if (!(whitelist.includes(msg.author.id))) return msg.channel.send(new error.HardcodedWhitelistError(`eval`, msg.author.id).result);

        let depth = parseInt(args[1]),
            raw = args.slice(isNaN(depth) ? 1 : 2).join(' ');
        if (isNaN(depth)) depth = 0;
        if (!raw) return msg.reply('You must specify code to execute.');
        let evalOutput;
        try
        {
            evalOutput = (await eval(raw));
        } catch (e)
        {
            evalOutput = e;
        }
        const typ = typeof evalOutput;
        evalOutput = inspect(evalOutput, { depth: depth });
        const evaled = evalOutput.match(/(\s|\S){1,1850}/g);
        let index = 0;
        const em = await msg.channel.send(`Computing...`).catch(e => e);
        function up() { em.edit(`\`\`\`js\n${evaled[index]}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}. Page ${index + 1} of ${evaled.length}\`\`\``); };
        up();
        ['❌', '⏮', "◀️", "▶️", '⏭', '🗑️'].map(v => em.react(v));
        const collector = em.createReactionCollector((r, u) => (u.id === msg.author.id));
        collector.on('collect', (r) =>
        {
            switch (r.emoji.name)
            {
                case '❌':
                    em.edit('```\nEvaluation results closed.```');
                    break;
                case "▶️":
                    index = (index == (evaled.length - 1)) ? index : index + 1;
                    up();
                    break;
                case "◀️":
                    index = index ? index - 1 : index;
                    up();
                    break;
                case "⏮":
                    index = 0;
                    up();
                    break;
                case "⏭":
                    index = evaled.length - 1;
                    up();
                    break;
                case "🗑️":
                    em.delete();
                    collector.stop();
                    break;
            }
        });
    }
};
