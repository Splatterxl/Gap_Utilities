const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const request = require('request');

module.exports = {
    help: {
        "name": ">kiss",
        "id": "kiss",
        "aliases": [
            "kiss"
        ],
        "desc": "Kiss a user!",
        "example": ">kiss @Splatterxl#8999"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        let responses = [
            '**!!{author}!!** kissed **!!{recipient}!!**! Mwah!',
            '**!!{author}!!** gently kissed **!!{recipient}!!**\'s lips!',
            '**!!{author}!!** gave **!!{recipient}!!** a kiss on the cheek!'
        ];
        try
        {
            if ((!msg.mentions.users.first()) || (msg.mentions.users.first() == msg.author)) return;
            request(
                `https://purrbot.site/api/img/sfw/kiss/gif`,
                { json: true },
                (err, res, body) =>
                {
                    if (err)
                    {
                        return console.log(err);
                    }
                    var test = body;
                    const panda = new Discord.MessageEmbed({
                        footer: { text: 'Powered By *Purr*' },
                        color: 'BLACK',
                        title: (msg.mentions.users.first() !== msg.author) ? responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/\!\!\{recipient\}\!\!/, msg.mentions.users.first().tag) : `${msg.author.tag} wants a kiss...`,

                    }).setImage(test.link);
                    msg.channel.send(panda);
                }
            );
        } catch (e)
        {

        }
    }
};