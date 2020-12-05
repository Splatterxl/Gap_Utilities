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
            if (msg.mentions.everyone || (args[1] == 'everyone')) return (await msg.channel.send('A massacre has occured.\nEveryone is dead.\nRest in peace. <:rip:784743972802527232>'));
            if (msg.mentions.users.first().bot) msg.reply('Do you really want to !!{action}!! a bot? Ok.'.replace(/\!\!\{action\}\!\!/, 'kill'));
            if (msg.mentions.users.first() !== msg.author)
                msg.channel.send(responses[Math.floor(Math.random() * responses.length)].replace(/\!\!\{author\}\!\!/, msg.author.tag).replace(/\!\!\{recipient\}\!\!/, msg.mentions.users.first().tag)); else msg.channel.send(['Uhhhhh... let\'s not do that, !!{author}!!.', 'I\'m not gonna do that, !!{author}!!...', 'uhhhhhhhh... no.'][Math.floor(Math.random() * Math.floor(Math.PI))].replace(/\!\!\{author\}\!\!/, '**' + msg.author.tag + '**'));
        } catch (e)
        {

        }
    }
};