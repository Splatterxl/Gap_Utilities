const Discord = require('discord.js');
let embeds = require('../misc/embeds');
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
        "category": "fun",
        "whitelisted": false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db, flags, ctx) =>
    {
        let target;
        if (args[1]) target = require("../misc/idify")(args[1]); else target = msg.author.id;

        if (!db.get(`gai.${target}`)) db.set(`gai.${target}`, `${Math.floor(Math.random() * 100)}%`);
        ctx.respond(new Discord.MessageEmbed({
            title: "gai meter uwu",
            description: `<@${target}> is **${db.get(`gai.${target}`)}** gay.`,
            color: "YELLOW"
        }));
    }
};
