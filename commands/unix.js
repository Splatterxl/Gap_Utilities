let Discord = require("discord.js");
let child_process = require("child_process");
let error = require("../assets/Error");
let embed = require('../assets/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require("./../whitelist");

module.exports = {
    help: {
        name: `>unix`,
        id: `unix`,
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
                await child_process.exec(msg.content.slice(5), (e, stdout, stderr) =>
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
