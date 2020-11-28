let request = require('request');
let Discord = require('discord.js');

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
            "https://some-random-api.ml/img/red_panda",
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
                    .setTitle("Cute Red Panda Boi")
                    .setImage(test.link)
                    .setFooter(`Requested by ${message.author.tag} (${message.author.id})`);
                message.channel.send(panda);
            }
        );
    }
};