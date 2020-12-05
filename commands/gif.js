let request = require('request');
let Discord = require('discord.js');
const qs = require('querystring');

module.exports = {
    help: {
        name: '>rpanda',
        id: 'rpanda',
        desc: 'Gets a random red panda image.',
        example: '>rpanda'
    },
    run: (bot, message, args) =>
    {
        request(
            "http://api.giphy.com/v1/gifs/search?api_key=AnblCmVmXmY66qRbCcRgDzJEd14mUCkS&q=" + qs.encode(message.content.slice(global.settings.settings[message.guild.id].prefix.length + 4)),
            { json: true },
            (err, res, body) =>
            {
                if (err)
                {
                    return console.log(err);
                }
                let test = body;
                const panda = new Discord.MessageEmbed()
                    .setColor("BLACK")
                    .setTitle("Anime Hug")
                    .setImage(test.data[0].images.original.url)
                    .setFooter(`Requested by ${message.author.tag} (${message.author.id})`);
                message.channel.send(panda);
            }
        );
    }
};