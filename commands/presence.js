const Discord = require('discord.js');
let embeds = require('../assets/embeds');

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

        let status = args.slice(1).join(' ');
        bot.user.setActivity(status, { type: args[0] });
        msg.channel.send('Presence successfully updated.');
        msg.react('✅');
    }
};