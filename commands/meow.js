let request = require('request');
let Discord = require('discord.js');

module.exports = {
    help: {
        name: '>meow',
        id: 'meow',
        aliases:["cat","catpic"],
        desc: 'Gets a random cat image.',
        example: '>meow'
    },
    run: (bot, message, args) =>
    {
        request(
            "https://api.thecatapi.com/v1/images/search",
            { json: true },
            (err, res, body) =>
            {
                if (err)
                {
                    return console.log(err);
                }
                var test = JSON.parse(JSON.stringify(body).slice(1, -1));
                const catto = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Cute Cat Picture")
                    .setImage(test.url)
                    .setFooter("Requested by " + message.author.username);
                message.channel.send(catto);
            }
        );
    }
};
