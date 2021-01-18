/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const request = require('request'),
    fetch = require('node-fetch');

module.exports = {
    help: {
        "name": ">embedcreator",
        "id": "embedcreator",
        "aliases": [
            
        ],
        "desc": ".",
        "example": ">embedcreator",
        "category": "images",
        "whitelisted": false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args, db, flags) =>
    {
        if (!require("../whitelist").includes(msg.author.id)) return;
        let options = flags.getObj().options;
        msg.channel.send(new Discord.MessageEmbed(options))
    }
}
