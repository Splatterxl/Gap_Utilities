/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../assets/embeds');
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
        "whitelisted": false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!(await (require('../assets/vbapi').voted(bot.user.id, msg.author.id))).voted && !(require('../whitelist').includes(msg.author.id))) return msg.channel.send(new Discord.MessageEmbed({
            description: `<:redTick:796095862874308678> I couldn't execute this command because you'ven't voted on <https://voidbots.net/bot/${bot.user.id}/vote>! Please note that it may take up to 5 minutes for your vote to register.`
        }));
        try
        {
            fetch('https://purrbot.site/api/img/sfw/kitsune/img').then(res => res.json()).then(body =>
            {
                require("../assets/depression")(await msg.channel.send(new Discord.MessageEmbed({
                    color: 'BLACK',
                    footer: {
                        text: 'Powered by *Purr*'
                    },
                    image: { url: body.link },
                    title: 'Here\'s your kitsune!'
                })), msg);
            });
        } catch {

        }
    }
};
