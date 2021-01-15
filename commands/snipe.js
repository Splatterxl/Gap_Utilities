// @ts-nocheck
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const firebase = require('firebase');

module.exports = {
    help: {
        "name": ">ping",
        "id": "run",
        "aliases": [
            "ping",
            "pong"
        ],
        "desc": "Test if the bot is online!",
        "example": ">ping"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db) =>
    {
        let snipe = global.snipes.get(msg.channel.id);
        msg.reply(snipe ? snipe.content : 'None yet!');
    }
};