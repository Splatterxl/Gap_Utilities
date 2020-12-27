const Discord = require("discord.js"),
    firebase = require('firebase'),
    idify = require("./idify")

module.exports = {
    help: null,
    /**
    *
    * @param {Discord.Client} bot
    * @param {Discord.Message | Discord.PartialMessage} msg
    * @param {firebase.default.database.Database} db
    */
    run: async (bot, msg, db) =>
    {
        if (msg.author !== null && msg.author.bot) return;
        // @ts-ignore
        if (msg.content.includes(`<@${bot.user.id}>`) || msg.content.includes(`<@!${bot.user.id}>`)) msg.reply('Sup, iirc my prefix in this server is `' + (await (db.ref(`settings/${msg.guild.id}/prefix`).get())).val() + '`, but idk, someone might have changed it.');


        if (msg.content.match(/<@!?\d{18}>/g))
        {
            for (let ping of msg.content.match(/<@!?\d{18}>/g))
            {
                if (((await (db.ref(`afk/${msg.guild.id}`).get())).val())[idify(ping)])
                {
                    msg.reply(new Discord.MessageEmbed({
                        title: `They are AFK!`,
                        description: `${ping} is AFK!\nReason: \`\`\`\n${await (await (db.ref(`afk/${msg.guild.id}/${ping}`).get())).val()}\`\`\``
                    }));
                }
            }
        }
    }
};

