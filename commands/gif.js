"use strict";
let request = require('request');
let Discord = require('discord.js');
const qs = require('querystring');
const embeds = require('../assets/embeds');

module.exports = {
    help: {
        name: '>gif',
        id: 'gif',
        aliases:["giphy","gif"],
        desc: 'Searches GIPHY for a GIF of that name.',
        example: '>gif why have i done thiss',
        category:"imagegen",
        whitelisted:false
    },
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: (bot, message, args) =>
    {
        if (!args[1]) return message.channel.send(embeds.noArgs('>gif whyy', 1, {
            name: 'Argument Explanation',
            value: '```\n<search_query> A search query.```',
            inline: true
        }));

        request(
            // @ts-ignore
            "http://api.giphy.com/v1/gifs/search?api_key=AnblCmVmXmY66qRbCcRgDzJEd14mUCkS&limit=10&q=" + qs.stringify({ term: (await(db.ref(`settings/${message.guild.id}/prefix`).get())).val() }),
            { json: true },
            (err, res, body) =>
            {
                // @ts-ignore
                if ((!message.channel.nsfw) && (body.data[0].rating !== 'g')) return message.channel.send(embeds.NSFWGifFound());
                if (err)
                {
                    return console.log(err);
                }
                const panda = new Discord.MessageEmbed()
                    .setColor("BLACK")
                    .setTitle("Gif Search")
                    .setImage(body.data[Math.floor(Math.random() * 10)].images.original.url)
                    .setFooter(`Powered by GIPHY`);
                message.channel.send(panda);
            });
    }
};
