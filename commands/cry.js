const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const request = require('request');

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
        request(
            `http://api.giphy.com/v1/gifs/search?api_key=AnblCmVmXmY66qRbCcRgDzJEd14mUCkS&q=anime+cry`,
            { json: true },
            (err, res, body) =>
            {
                const test = body;
                if (err)
                {
                    return console.log(err);
                }
                const img = test.data[Math.floor(Math.random() * test.data.length)].images.original.url;
                const panda = new Discord.MessageEmbed({
                    footer: { text: 'Powered By GIPHY' },
                    color: 'BLACK',
                    title: `${msg.author.tag} is crying... :c`,

                }).setImage(img);
                msg.channel.send(panda);
            }
        );
    }
};