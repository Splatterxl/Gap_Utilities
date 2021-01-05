/* eslint-disable @typescript-eslint/no-var-requires */
const error = require("../assets/Error");
let embeds = require('../assets/embeds');
let whitelist = require('../whitelist');
const hastebin = require('hastebin-gen');
const { inspect } = require("util");
const err = require('../assets/errorHandler');


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
    run: async (bot, msg, args) =>
    {
        // if ((!(msg.author.id === '728342296696979526')) || (!(require('../whitelist').includes(msg.author.id)))) return msg.channel.send("You are not in the whitelist or you do not have the `ADMINISTRATOR` permission.");
        if (!(whitelist.includes(msg.author.id))) return msg.channel.send(new error.HardcodedWhitelistError(`unix`, msg.author.id).result);
        let raw = args.slice(2).join(' ');
        let depth = parseInt(args[1]);
        if (!(typeof depth === "number") || isNaN(depth)) return msg.reply('What depth lol?');
        if (!raw) return msg.reply('You must specify code to execute.');
        let evalOutput;
        try
        {
            evalOutput = (await eval(raw));
        } catch (e) { evalOutput = e; }
        evalOutput = inspect(evalOutput, { depth: depth });
        // try { evalOutput = eval(raw); } catch (e) { msg.reply(e); }
        if (`${evalOutput}`.includes(bot.token)) evalOutput = `${evalOutput}`.replace(bot.token, '*'.repeat(bot.token.length));



        msg.channel.send('Here are your evaluation results!', (`${evalOutput}`.length >= 1024) ? embeds.eval(raw, `Output was too long. <${await hastebin(`${evalOutput}`).then(h => h)}>`) : embeds.eval(raw, evalOutput)).catch(e => msg.channel.send(embeds.rejected(e)));
        msg.react('✅');
    }
};;;
