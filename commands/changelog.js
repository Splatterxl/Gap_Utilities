/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js'),
  pkg = require("../package.json")

module.exports = {
    help: {
        "name": ">changelog",
        "id": "changelog",
        "aliases": [
            
        ],
        "desc": "Get the changelog of a specific version of this bot.",
        "example": ">changelog 3.3.0",
        "category": "bot",
        "whitelisted": false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        msg.channel.send(pkg.changelog[args[1].replace(/[v\^]/g, "") || pkg.version] || pkg.changelog[pkg.version], { code: "md" })
    }
};
