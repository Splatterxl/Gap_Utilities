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
    run: async (bot, msg, args, db) =>
    {
        let msgF = (await msg.channel.send("<a:loading:792828224648380436> Getting Latencies..."));

        let msgLatency = (await msgF.edit('<a:loading:792828224648380436> Still getting Latencies...')).editedTimestamp - msgF.createdTimestamp;


        msgF.edit('Got Latencies!', new Discord.MessageEmbed({
            title: '🏓 Pong!',
            color: 'RED',
            description: 'The bot is online!',
            fields: [
                {
                    name: 'WS Latency',
                    value: `\`\`\`js\n${bot.ws.ping}\`\`\``,
                    inline: true
                },
                {
                    name: 'Edit Latency',
                    value: `\`\`\`js\n${msgLatency}\`\`\``
                },
                {
                    name: 'Database Latency',
                    value: `\`\`\`js\n${await (async () => { let dat = Date.now(); (await db.ref('gai').get()).val(); return Date.now() - dat; })()}\`\`\``
                }
            ],
            timestamp: Date.now(),
            thumbnail: {
                url: 'https://cdn.discordapp.com/emojis/796103406468464640.png?v=1'
            }
        }));
        msg.react('✅');
    }
};
