// @ts-nocheck
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const firebase = require('firebase');

module.exports = {
    help: {
        "name": ">snipe",
        "id": "snipe",
        "aliases": [
            "snipe",
            "editsnipe"
        ],
        "desc": "Test if the bot is online!",
        "example": ">ping"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, args, db) =>
    {
        let snipe = global.snipes.get(msg.channel.id);
        msg.reply(snipe ? new Discord.MessageEmbed({
          color: "YELLOW",
          description: `${snipe.editedTimestamp ? "Edit s" : "S"}nipe by ${snipe.author.tag} (${snipe.author.id})`, 
          fields: [{name:`${snipe.editedAt ? "New " : ""}Content`,value:snipe.content}]
        }) : 'None yet!');
    }
};
