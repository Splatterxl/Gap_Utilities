const Discord = require('discord.js');
let embeds = require('../misc/embeds');

module.exports = {
    help: {
        "name": ">presence",
        "id": "presence",
        "aliases": [
            "presence"
        ],
        "desc": "Changes the presence of the bot.",
        "example": ">presence playing with fire"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!(msg.author.id === '728342296696979526')) { msg.react('❌'); return msg.channel.send(embeds.notWhitelisted()); };
        // @ts-ignore
        global.presenceInterval.close();
        bot.user.setActivity({
                    type: args[1].toUpperCase(),
                    name: args.slice(2).join(" ")
                }).catch(e => null);
               msg.channel.send(new Discord.MessageEmbed({description:`<:greenTick:796095828094615602> Successfully changed my presence to \`${args.slice(1).map((v, i) => i == 0 ? v.toUpperCase() : v).join(" ")}\`.`,color:"GREEN"})); 
    }
};
