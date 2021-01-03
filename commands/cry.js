const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const request = require('request');

module.exports = {
    help: {
        "name": ">cry",
        "id": "cry",
        "aliases": [
            "cry",
            "cwy"
        ],
        "desc": "Show that you are crying...",
        "example": ">cry",
        "category":"fun",
        "whitelisted":false 
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        request(
            `https://purrbot.site/api/img/sfw/cry/gif`,
            { json: true },
            (err, res, body) =>
            {
                const test = body;
                if (err)
                {
                    return console.log(err);
                }
                const img = test.link;
                const panda = new Discord.MessageEmbed({
                    footer: { text: 'Powered By *Purr*' },
                    color: 'BLACK',
                    title: `${msg.author.tag} is crying... :c`,

                }).setImage(img);
                msg.channel.send(panda);
            }
        );
    }
};
