const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const firebase = require('firebase');

module.exports = {
    
    help: {
        "name": ">ping",
        "id": "ping",
        "aliases": [
            "pong"
        ],
        "desc": "Test if the bot is online!",
        "example": ">ping",
        category: 'bot',
        permLvl: 1
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db, flags, ctx) =>
    {
        let msgF = await ctx.respond("<a:loading:761675912102019103> Getting Latencies...");

        let msgLatency = (await msgF.edit('<a:loading:761675912102019103> Still getting Latencies...')).editedTimestamp - msgF.createdTimestamp;
        const pings = {
              ws: ctx.client.ws.ping,
              edit: msgLatency,
              cmdHandler: Date.now() - ctx.initialisedTimestamp       
        }

        msgF.edit('Got Latencies!', new Discord.MessageEmbed({
            title: '🏓 Pong!',
            color: 'YELLOW',
            description: 'Hai there UwU',
            fields: [
                {
                    name: 'Gateway Heartbeat Latency',
                    value: `${pings.edit < 200 ? "🟢" : "🔴"} ${pings.ws}ms`,
                    inline: true
                },
                {
                    name: 'Message Roundtrip',
                    value: `${pings.edit < 200 ? "🟢" : "🔴"} ${pings.edit}ms`,
                    inline: true
                },
                {
                    name: 'Command Handler',
                    value: `${pings.edit < 200 ? "🟢" : "🔴"} ${pings.cmdHandler}ms`,
                    inline: true
                },
                
            ],
            timestamp: Date.now(),
        }))
    }
};
