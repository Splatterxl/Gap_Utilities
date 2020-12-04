const Discord = module.require("discord.js");
const math = require('mathjs');

function parseIDs(text)
{
    var baseURL = 'https://cdn.discordapp.com/emojis/';
    let emojis = [];

    let parsedEmojis = text.match(/<a?:[a-z0-9_]+:[0-9]+>/gi);

    for (let i in parsedEmojis)
    {
        let emoji = parsedEmojis[i];
        let name = emoji.match(/:[a-z0-9_]+:/gi)[0].substr(1).slice(0, -1);
        let id = emoji.match(/:[0-9]+>/gi)[0].substr(1).slice(0, -1);
        let gif = (emoji.match(/<a:/gi) ? true : false);
        let url = baseURL + id + (gif ? ".gif" : ".png");
        emojis.push({ name, id, gif, url });
    }
    return emojis;
}

function getRandomItem(set)
{
    let items = Array.from(set);
    return items[Math.floor(math.randomInt(0, items.length))];
}

module.exports.run = async (bot, msg, args) =>
{
    if (!args[0])
    {
        return msg.channel.send('You must use at least one emoji');
    }
    let emojis = parseIDs(msg.content);
    if (!emojis.length)
    {
        return msg.channel.send('Is that an emoji?');
    }
    let emojiUrls = [];
    let tmp = [];
    let k = 0;
    let j = 0;
    for (let i of emojis)
    {
        if (k >= 10)
        {
            j++;
            emojiUrls.push(tmp);
            tmp = [];
        }
        tmp.push(i.url);
        k++;
    }
    emojiUrls.push(tmp);
    let files = emojiUrls.map((file, index) => ({ files: file, name: `${index}.png` }));
    for (let i of emojiUrls)
    {
        msg.channel.send({ files: i });
    }
};

module.exports.help = {
    name: 'showemoji',
    desc: 'Shows emojis as a big picture. [COPY PASTA FROM DANIEL]',
    example: '>showemoji :emoji:'
};