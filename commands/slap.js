const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const fetch = require('node-fetch');

module.exports = {
    help: {
        "name": ">hug",
        "id": "hug",
        "aliases": [
            "hug"
        ],
        "desc": "Hug a user!",
        "usage": ">hug <user>",
        category: "actions"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args, db, flags, ctx) =>
    {
        if (msg.mentions?.users?.first()?.bot) return ctx.respond('Do you really want to !!{action}!! a bot?'.replace(/\!\!\{action\}\!\!/, 'hug'));
        let responses = [
            '**!!{author}!!** slapped **!!{recipient}!!**! SMACK!',
            '**!!{author}!!** gave **!!{recipient}!!** a slap! Ouchhhhhie!',
            '**!!{author}!!** slapped **!!{recipient}!!**.'
        ];
        if (!msg.mentions?.users?.first()) ctx.respond(ctx.util.embeds.errorEmbed("You need to **mention** someone!"))
        fetch(
            "https://purrbot.site/api/img/sfw/slap/gif")
            .then(res => res.json())
            .then(body =>
            {
                const panda = new Discord.MessageEmbed({
                    color: "YELLOW",
                    title: responses[Math.floor(Math.random() * responses.length)].replace(/!!\{author\}!!/, msg.author.tag).replace(/!!\{recipient\}!!/, msg.mentions.users.first().tag),
                    image: {
                        url: body.link
                    }
                }); ctx.respond(panda);
            }
            );

    }
};

