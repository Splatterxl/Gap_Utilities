/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const request = require('request'),
    fetch = require('node-fetch');

module.exports = {
    help: {
        "name": ">eevee",
        "id": "eevee",
        "aliases": [
            "eevee"
        ],
        "desc": "Eevee? Vee!",
        "example": ">eevee",
        "category": "images",
        "whitelisted": false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        try
        {
            fetch('https://purrbot.site/api/img/sfw/eevee/gif').then(res => res.json()).then(async body =>
            {
                require("../misc/depression")((await msg.channel.send(new Discord.MessageEmbed({
                    color: 'BLACK',
                    footer: {
                        text: 'Powered by *Purr*'
                    },
                    image: { url: body.link },
                    title: 'Eevee? Eevee! Vee vee!'
                }))), msg);
            });
        } catch {

        }
    }
};
