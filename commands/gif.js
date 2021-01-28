"use strict";
let request = require('request');
const Discord = require('discord.js'),
  embeds = require('../misc/embeds');

module.exports = {
    help: {
        name: '>gif',
        id: 'gif',
        aliases: ["giphy", "gif"],
        desc: 'Searches GIPHY for a GIF of that name.',
        example: '>gif why have i done thiss',
        category: "images",
        whitelisted: false
    },
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: (bot, message, args,db, flags, ctx) =>
    {
        if (!args[1]) return ctx.respond(new Discord.MessageEmbed({ color: "RED", description: "<:redTick:796095862874308678> I need a search query!" }));

        request(
            // @ts-ignore
            "http://api.giphy.com/v1/gifs/search?api_key=AnblCmVmXmY66qRbCcRgDzJEd14mUCkS&limit=10&q=" + encodeURIComponent(args.slice(1).join(" ")),
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
