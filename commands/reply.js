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
            title: 'Reply sent!',
            description: `View it here: [CLICK ME PLZ](https://discord.com/channels/${m.guild.id}/${m.channel.id}/${m.id})`
        }));
        // @ts-ignore
        (await (await bot.channels.fetch('789939447961616455', true)).messages.fetch(args[1])).edit(new Discord.MessageEmbed({
            title: `Suggestion`,
            author: {
                iconURL: msg.author.avatarURL(),
                icon_url: msg.author.avatarURL(),
                name: `${msg.author.tag} (${msg.author.id})`
            },
            // @ts-ignore
            description: `**Suggestion:**\n${bot.channels.cache.get('789939447961616455').messages.cache.get(args[1]).embeds[0].description}\n ** Reply from <@${msg.author.id}>:**\n${args.slice(2).join(' ')}`,
            footer: {
                // @ts-ignore
                text: `${(await (await bot.channels.fetch('789939447961616455', true)).messages.fetch(args[1])).embeds[0].footer.text}`
            }
        })

        ).then(suggested);
    }
};;;
