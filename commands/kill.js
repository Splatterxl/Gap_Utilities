const Discord = require('discord.js');
let embeds = require('../assets/embeds');

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
        let responses = [
            '**!!{author}!!** killed **!!{recipient}!!**.',
            '**!!{author}!!** stabbed **!!{recipient}!!**! Ouch!',
            '**!!{author}!!** ran across the room and killed **!!{recipient}!!**.'
        ];
        try
        {
            if (msg.mentions.users.first() !== undefined)
            {
                if (msg.mentions.users.first().bot) return msg.reply('Do you really want to !!{action}!! a bot? Okay...'.replace(/\!\!\{action\}\!\!/, 'kiss'));
                if (msg.mentions.users.first() !== msg.author) request(
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

            } else if (args[1])
            {
                /**
                 * @type {Discord.User}
                 */
                let user = (await bot.users.fetch(args[1]));

                if (user !== msg.author)
                    msg.channel.send(responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/\!\!\{recipient\}\!\!/, user.tag)); else msg.channel.send(['Uhhhhh... let\'s not do that, !!{author}!!.', 'I\'m not gonna do that, !!{author}!!...', 'uhhhhhhhh... no.'][Math.floor(Math.random() * Math.floor(Math.PI))].replace(/\!\!\{author\}\!\!/, '**' + msg.author.tag + '**'));
            }
        } catch (e)
        {
            msg.channel.send(embeds.rejected(e));
        }
    }
};