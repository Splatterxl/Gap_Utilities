const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const firebase = require('firebase');

module.exports = {
    help: {
        "name": ">gaycheck",
        "id": "gaycheck",
        "aliases": [
            "gaycheck",
            "gaicheck",
            "geicheck"
        ],
        "desc": "Gets the gay percentage of a user.",
        "example": ">gaycheck @Splatterxl#8999"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db) =>
    {
        if (!((await db.ref(`gai/${msg.author.id}`).get()).val())) db.ref(`gai/${msg.author.id}`).set(`${Math.floor(Math.random()*100)}%`);
        msg.reply(new Discord.MessageEmbed({
          title: "Gay Percentage",
          description: (msg.tag!=='Splatterxl#8999')?`<@${msg.author.id}> is **${(await db.ref(`gai/${msg.author.id}`).get()).val()}** gay.`:"MY AUTHOR IS NOT GAY"
        }))
    }
};
