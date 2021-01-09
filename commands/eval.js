/* eslint-disable @typescript-eslint/no-var-requires */
const error = require("../assets/Error");
let embeds = require('../assets/embeds');
let whitelist = require('../whitelist');
const hastebin = require('hastebin-gen');
const { inspect } = require("util");
const err = require('../assets/errorHandler');
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
        // if ((!(msg.author.id === '728342296696979526')) || (!(require('../whitelist').includes(msg.author.id)))) return msg.channel.send("You are not in the whitelist or you do not have the `ADMINISTRATOR` permission.");
        if (!(whitelist.includes(msg.author.id))) return msg.channel.send(new error.HardcodedWhitelistError(`eval`, msg.author.id).result);
        let raw = args.slice(2).join(' ');
        let depth = parseInt(args[1]);
        if (!(typeof depth === "number") || isNaN(depth)) return msg.reply('What depth lol?');
        if (!raw) return msg.reply('You must specify code to execute.');
        let evalOutput;
        try
        {
            evalOutput = (await eval(raw));
        } catch (e) { evalOutput = e; }
        const typ = typeof evalOutput;
        evalOutput = inspect(evalOutput, { depth: depth });
        // try { evalOutput = eval(raw); } catch (e) { msg.reply(e); }
        if (`${evalOutput}`.includes(bot.token)) evalOutput = `${evalOutput}`.replace(bot.token, '*'.repeat(bot.token.length));


        const evaled = evalOutput.match(/(\s|\S){1,1850}/g);
        let index = 0;
        const em = await msg.channel.send(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}\`\`\``).catch(e => msg.channel.send(embeds.rejected(e)));
        await em.react('❌');
        await em.react("◀️");
        await em.react("▶️");
        const collector = em.createReactionCollector((r, u) => (u.id === msg.author.id), {
            time: 30000
        });
        collector.on('collect', (r) =>
        {
            switch(r.emoji.name) {
              case '❌': 
                em.edit('```\nEvaluation results closed.```');
                break;
              case "▶️":
                index = (index == (evaled.length - 1)) ? index : index + 1
                em.edit(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}\`\`\``);
                break;
              case "◀️":
                index = index ? index - 1 : index;
                em.edit(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}\`\`\``)
                break;
           }
        });

        collector.on('end', c =>
        {
            console.log('Collected ${c.size} emojis');
            em.edit(em.content + `\nCollector closed. Collected ${c.size} reactions.`).catch();
        });
    }
};
