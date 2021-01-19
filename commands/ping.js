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
        category: 'bot'
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
        const pings = flags._obj.solo?.includes("force") || flags._obj.solo?.includes("f") 
          ? {
              ws: ctx.client.ws.ping,
              edit: msgLatency,
              db: await (async () => { let dat = Date.now(); (await db.ref('gai').get()).val(); return Date.now() - dat; })()
             }
          : {
              get ws () { return Math.round(Math.random() * 50000) },
              get edit () { return Math.round(Math.random() * 50000) },
              get db () { return Math.round(Math.random() * 50000) }
            }

        msgF.edit('Got Latencies!', new Discord.MessageEmbed({
            title: '🏓 Pong!',
            color: 'RED',
            description: 'The bot is online!',
            fields: [
                {
                    name: 'WS Latency',
                    value: `\`\`\`js\n${pings.ws}\`\`\``,
                    inline: true
                },
                {
                    name: 'Edit Latency',
                    value: `\`\`\`js\n${pings.edit}\`\`\``
                },
                {
                    name: 'Database Latency',
                    value: `\`\`\`js\n${pings.db}\`\`\``
                }
            ],
            timestamp: Date.now(),
            thumbnail: {
                url: 'https://cdn.discordapp.com/emojis/796103406468464640.png?v=1'
            }
        }))
    }
};
