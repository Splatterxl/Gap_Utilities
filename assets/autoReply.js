const Discord = require("discord.js");
const { mkdirSync } = require('fs');
const jsonfile = require('jsonfile');
const message = require('../events/message');
const phrases = [
    "custom bot",
    "simp",
    "stupid",
    "you like"
];

const messages = {
    "custom bot": "Yes, we have a custom bot.",
    "simp": "You are not a simp.",
    "stupid": "You are not stupid.",
    "you like": "Well, let's not get into that then...",
    "true": [
        "True...",
        "I am programmed to respond `True...` to your messages.",
        "You are absolutely correct, oh kind and mighty master...",
        "Yes, but...",
        "Absolutely"
    ]
};
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message | Discord.PartialMessage} msg
 */

const run = (bot, msg) =>
{
    for (var element of phrases)
    {
        if (msg.content.includes(element))
            // @ts-ignore
            if (!msg.author.id === require("../settings.json").author) msg.author.reply(messages[element]);
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

