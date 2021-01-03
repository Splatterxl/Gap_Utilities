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
        "example": ">gaycheck @Splatterxl#8999",
        "category":"fun",
        "whitelisted":false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db) =>
    {
        let target;
        if (args[1]) target = require("../assets/idify")(args[1]); else target = msg.author.id;

        if (!((await db.ref(`gai/${target}`).get()).val())) db.ref(`gai/${target}`).set(`${Math.floor(Math.random()*100)}%`);
        msg.reply(new Discord.MessageEmbed({
          title: "Gay Percentage",
          description: `<@${target}> is **${(await db.ref(`gai/${target}`).get()).val()}** gay.`
        }))
    }
};
