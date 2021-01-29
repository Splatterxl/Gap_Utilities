/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const request = require('request'),
    fetch = require('node-fetch');

module.exports = {
    help: {
        "name": ">rem",
        "id": "rem",
        "aliases": [
            
        ],
        "desc": "Thanks Nek for letting me ~~steal~~ use your code.",
        "example": ">rem",
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
            fetch('https://rra.ram.moe/i/r?type=rem').then(res => res.json()).then(async body =>
            {
                ctx.respond(new Discord.MessageEmbed({
                    "title": "",
                    "url": `https://cdn.ram.moe/${body.path.replace("/i/", "")}`,
                    "color": 6192321,
                    "image": {
                      "url": `https://cdn.ram.moe/${body.path.replace("/i/", "")}`
                    },
                    "footer": {
                      "text": `Powered by Ram.moe`
                    }
                }));
            });
    }
};
