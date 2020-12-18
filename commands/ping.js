const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const firebase = require('firebase');

module.exports = {
    help: {
        "name": ">ping",
        "id": "eval",
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
        let msgF = (await msg.channel.send("Getting Latencies..."));

        let msgLatency = (await msgF.edit('Still getting Latencies...')).editedTimestamp - msgF.createdTimestamp;


        msgF.edit('Got Latencies!', (await embeds.pong(bot, msgLatency, db)));
        msg.react('✅');
    }
};