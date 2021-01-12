let Discord = require("discord.js");
let child_process = require("child_process");
let error = require("../misc/Error");
let embed = require('../misc/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require("./../whitelist");

module.exports = {
    help: {
        name: `>unix`,
        id: `unix`,
        aliases: ["exec", "u"],
        whitelisted: true,
        desc: `A *NIX command for you peeps (whitelisted)`,
        example: `>unix ls`
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!(whitelist.includes(msg.author.id))) return msg.channel.send(embed.notWhitelisted());
        else
        {
            try
            {
                msg.channel.startTyping();
                await child_process.exec(args.slice(1).join(' '), (e, stdout, stderr) =>
                {
                    // @ts-ignore
                    msg.channel.send((stdout.length <= 1023) ? embed.unixRes(stdout, stderr) : hastebin(stdout + '\n\n\n' + stderr, { extension: 'js' }).then(haste => msg.channel.send('Output was too long. ' + haste)));
                    msg.channel.stopTyping(true);
                });
            } catch (e)
            {
                msg.react('❌');
                msg.channel.stopTyping(true);
            }
        }
    }
};
