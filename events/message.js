import Discord from "discord.js";
const bot = new Discord.Client();
module.exports = (message) => {
    const commands = new Commands();

    function Commands () {
        this.help = require("../commands/help");
        this.ping = require("../commands/ping");
        this.verify = require("../commands/verify");
        this.uwu = require("../commands/uwu");
    }
}