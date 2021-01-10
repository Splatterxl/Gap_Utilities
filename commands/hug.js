/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const request = require('request'),
    fetch = require('node-fetch');

module.exports = {
    help: {
        "name": ">hug",
        "id": "hug",
        "aliases": [
            "hug"
        ],
        "desc": "Hug a user!",
        "example": ">hug @Splatterxl#8999",
        "category": "fun",
        "whitelisted": false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (msg.mentions.users.first().bot) return msg.reply('Do you really want to !!{action}!! a bot?'.replace(/\!\!\{action\}\!\!/, 'hug'));
        let responses = [
            '**!!{author}!!** hugged **!!{recipient}!!**!',
            '**!!{author}!!** embraced **!!{recipient}!!**!',
            '**!!{author}!!** ran across the room and gave **!!{recipient}!!** a big fat hug!'
        ];
        try
        {
            fetch('https://purrbot.site/api/img/sfw/hug/gif').then(res => res.json()).then(body =>
            {
                msg.channel.send(new Discord.MessageEmbed({
                    color: 'BLACK',
                    footer: {
                        text: 'Powered by *Purr*'
                    },
                    image: { url: body.link },
                    title: (msg.mentions.users.first() !== msg.author) ? responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/!!\{recipient\}!!/, msg.mentions.users.first().tag) : `${msg.author.tag} wants a hug...`
                }));
            });
        } catch {

        }
    }
};
