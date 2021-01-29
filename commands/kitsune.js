/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const request = require('request'),
    fetch = require('node-fetch');

module.exports = {
    help: {
        "name": ">kitsune",
        "id": "kitsune",
        "aliases": [
            "kit"
        ],
        "desc": "Get a kitsune cuz why not",
        "example": ">kitsune",
        "category": "images",
        "whitelisted": false,
        voteLocked: true
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args, db, flags, ctx) =>
    {
            fetch('https://purrbot.site/api/img/sfw/kitsune/img').then(res => res.json()).then(async body =>
            {
                ctx.respond(new Discord.MessageEmbed({
                    color: 'YELLOW',
                    footer: {
                        text: 'Powered by *Purr*'
                    },
                    image: { url: body.link },
                    title: 'Here\'s your kitsune!'
                }));
            });
    }
};
