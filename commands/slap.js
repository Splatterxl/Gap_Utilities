const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const request = require('request');

module.exports = {
    help: {
        "name": ">hug",
        "id": "hug",
        "aliases": [
            "hug"
        ],
        "desc": "Hug a user!",
        "example": ">hug @Splatterxl#8999"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (msg.mentions.users.first().bot) return msg.reply('Do you really want to !!{action}!! a bot?'.replace(/\!\!\{action\}\!\!/, 'hug'));
        let responses = [
            '**!!{author}!!** slapped **!!{recipient}!!**! SMACK!',
            '**!!{author}!!** gave **!!{recipient}!!** a slap! Ouchhhhhie!',
            '**!!{author}!!** slapped **!!{recipient}!!**.'
        ];
        try
        {

            request(
                "https://purrbot.site/img/sfw/slap/gif",
                { json: true },
                (err, res, body) =>
                {
                    if (err)
                    {
                        return console.log(err);
                    }
                    var test = body;
                    const panda = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setTitle((msg.mentions.users.first() !== msg.author) ? responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/\!\!\{recipient\}\!\!/, msg.mentions.users.first().tag) : `${msg.author.tag} wants a hug...`)
                        .setImage(test.link);
                    msg.channel.send(panda).catch(e => { });
                }
            );
        } catch (e)
        {

        }
    }
};