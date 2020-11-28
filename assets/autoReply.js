const Discord = require("discord.js");
const { mkdirSync } = require('fs');
const jsonfile = require('jsonfile');
const message = require('../events/message');
const phrases = [
    "simp",
    "stupid",
    "you like",
    "?!"
];

const messages = {
    "simp": "You are not a simp.",
    "stupid": "You are not stupid.",
    "you like": "Well, let's not get into that then...",
    "true": [
        "True...",
        "I am programmed to respond `True...` to your messages.",
        "You are absolutely correct, oh kind and mighty master...",
        "Yes, but...",
        "Absolutely"
    ],
    "?!": "NANI?!"
};
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message | Discord.PartialMessage} msg
 */

const run = (bot, msg) =>
{
    if (msg.author.bot) return;
    // @ts-ignore
    if ((require('../settings.json')).settings[msg.guild.id].autoReply) { } else return;
    for (var element of phrases)
    {
        if (msg.content.includes('?!')) { if (msg.author.bot) { return; } else return msg.reply('NANI?!'); };
        if (msg.content.includes(element))
            if (!(msg.author.id === "728342296696979526")) msg.reply(messages[element]);
            else msg.channel.send(messages.true[Math.floor(Math.random() * messages.true.length)]);
    }
};

module.exports = {
    help: null,
    /**
    *
    * @param {Discord.Client} bot
    * @param {Discord.Message | Discord.PartialMessage} msg
    */
    run: (bot, msg) =>
    {
        run(bot, msg);
    }
};

