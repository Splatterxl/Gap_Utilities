let Discord = require("discord.js");
let child_process = require("child_process");
let error = require("../assets/Error");
let embed = require('../assets/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require("./../whitelist");

module.exports = {
    help: {
        name: `>suggest`,
        id: `suggest`,
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
        (await bot.channels.fetch('789939447961616455', true)).send(new Discord.MessageEmbed({
            title: `Suggestion`,
            author: {
                iconURL: msg.author.avatarURL(),
                icon_url: msg.author.avatarURL(),
                name: `${msg.author.tag} (${msg.author.id})`
            },
            description: args.slice(1).join(' '),
            footer: {
                // @ts-ignore
                text: `Suggestion #${bot.channels.cache.get('789939447961616455').messages.cache.size + 1}`
            }
        })).then(suggested);
    }
};
