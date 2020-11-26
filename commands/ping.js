const Discord = require('discord.js');
let embeds = require('../assets/embeds');

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
     */
    run: async (bot, msg, args) =>
    {
        let msgF = (await msg.channel.send("Getting Latencies..."));
        let when = Date.now();

        let msgLatency = (await msgF.edit('Still getting Latencies...')).editedTimestamp - msgF.createdTimestamp;


        msgF.edit('Got Latencies!', embeds.pong(bot, msgLatency));
    }
};