const Discord = require('discord.js');
let embeds = require('../misc/embeds');

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
            '**!!{author}!!** revived **!!{recipient}!!** after being nearly killed by **FortnitePro1923#2937**!',
            '**!!{author}!!** found an easter egg in the app to revive **!!{recipient}!!**!',
            '**!!{author}!!** revived **!!{recipient}!!** with a trademark IT trick™.'
        ];
        try
        {
            if (msg.mentions.users.first !== undefined)
            {
                if (msg.mentions.users.first().bot) return msg.reply('Do you really want to !!{action}!! a bot? Okay...'.replace(/\!\!\{action\}\!\!/, 'kiss'));
                if (msg.mentions.users.first() !== msg.author)
                    msg.channel.send(responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/\!\!\{recipient\}\!\!/, msg.mentions.users.first().tag)); else msg.channel.send(`**${msg.author.tag}** wants to be revived...`);
            } else if (args[1])
            {
                let user = (await bot.users.fetch(args[1]));
                if (user.bot) return msg.reply('Do you really want to !!{action}!! a bot? Okay...'.replace(/\!\!\{action\}\!\!/, 'kiss'));
                if (user !== msg.author)
                    msg.channel.send(responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/\!\!\{recipient\}\!\!/, user.tag)); else msg.channel.send(`**${user}** wants a kiss...`);
            }
        } catch (e)
        {

        }
    }
};