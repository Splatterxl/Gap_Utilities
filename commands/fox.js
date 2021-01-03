let request = require('request');
let Discord = require('discord.js');

module.exports = {
    help: {
        name: '>fox',
        id: 'fox',
        aliases: [
          "fox",
          "foxxy"
        ],
        desc: 'Get a fox image!',
        example: '>fox',
        category: "fun",
        whitelisted: false
    },
    run: (bot, message, args) =>
    {
        request(
            "https://some-random-api.ml/img/fox",
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
                    .setTitle("Foxx")
                    .setImage(test.link);
                message.channel.send(panda);
            }
        );
    }
};
