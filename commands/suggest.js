let Discord = require("discord.js");
let child_process = require("child_process");
let error = require("../misc/Error");
let embed = require('../misc/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require("./../whitelist");

module.exports = {
    help: {
        name: `>suggest`,
        id: `suggest`,
        aliases: ["addsuggestion"],
        desc: `Suggest something about the bot.`,
        example: `>suggest test`
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        /**
         * @param {Discord.Message} m
         */
        let suggested = m => msg.reply(new Discord.MessageEmbed({
            title: 'Suggestion sent!',
            description: `View it here: [CLICK ME PLZ](https://discord.com/channels/${m.guild.id}/${m.channel.id}/${m.id})`
        }));
        // @ts-ignore
        bot.channels.cache.get('795268580303699989').send(new Discord.MessageEmbed({
            title: `Suggestion`,
            author: {
                iconURL: msg.author.avatarURL(),
                icon_url: msg.author.avatarURL(),
                name: `${msg.author.tag} (${msg.author.id})`
            },
            description: args.slice(1).join(' '),
            footer: {
                // @ts-ignore
                text: `Suggestion #${(await bot.channels.cache.get('795268580303699989').messages.fetch()).size}`
            }
        })).then(suggested);
    }
};
