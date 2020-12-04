const Discord = require('discord.js');
let embeds = require('../assets/embeds');

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
            '**!!{author}!!** kissed **!!{recipient}!!**!'
        ];
        try
        {
            if (msg.mentions.users.first().bot) return msg.reply('Do you really want to !!{action}!! a bot?'.replace(/\!\!\{action\}\!\!/, 'kiss'));
            if (msg.mentions.users.first() !== msg.author)
                msg.channel.send(responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/\!\!\{recipient\}\!\!/, msg.mentions.users.first().tag)); else msg.channel.send(`**${msg.author.tag}** wants a kiss...`);
        } catch (e)
        {

        }
    }
};