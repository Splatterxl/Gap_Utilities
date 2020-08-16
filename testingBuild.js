const Discord = require("discord.js");
const bot = new Discord.Client({"presence": {"status":"dnd"}});
const config = require("./config.json");
const event = new Events();

const activities_list = [
    "Splatterxl", 
    "your feedback",
    "JavaScript",
    "your commands",
    "u!help",
    "NOTICE ME SENPAI!!!!"
]; // creates an arraylist containing phrases the bot will switch through.

bot.on("ready", () => {
    event.ready();
});

bot.on("message", message => {
    event.message(message);
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
    event.messageUpdate(oldMessage, newMessage);
});


function Events () {
    this.ready = require("./events/ready");
    this.message = require("./events/message");
    this.messageUpdate = require("./events/messageUpdate");
}




bot.login(config.botInfo.testing.token);
