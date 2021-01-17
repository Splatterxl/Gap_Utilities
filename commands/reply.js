let Discord = require("discord.js");
let child_process = require("child_process");
let error = require("../misc/Error");
let embed = require('../misc/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require("./../whitelist");

module.exports = {
    help: {
        name: `>reply`,
        id: `reply`,
        desc: `Reply.`,
        example: `>reply 800363137109852182 test`
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!require("../whitelist").includes(msg.author)) return msg.channel.send("Nah, you need to be whitelisted for this.")
        /**
         * @param {Discord.Message} m
         */
        let suggested = m => msg.reply(new Discord.MessageEmbed({
            title: 'Reply sent!',
            description: `View it here: [CLICK ME PLZ](https://discord.com/channels/${m.guild.id}/${m.channel.id}/${m.id})`
        }));
        // @ts-ignore
        (await bot.channels.cache.get('795268580303699989')?.messages.fetch(args[1])).edit(new Discord.MessageEmbed({
            title: `Suggestion`,
            author: {
                iconURL: msg.author.avatarURL(),
                icon_url: msg.author.avatarURL(),
                name: `${msg.author.tag} (${msg.author.id})`
            },
            // @ts-ignore
            description: `**Suggestion:**\n${bot.channels.cache.get('795268580303699989').messages.cache.get(args[1]).embeds[0].description}\n **Reply from <@${msg.author.id}>:**\n${args.slice(2).join(' ')}`,
            footer: {
                // @ts-ignore
                text: `${(await bot.channels.cache.get('795268580303699989')?.messages.fetch(args[1])).embeds[0].footer.text}`
            }
        })

        ).then(suggested);
    }
};
