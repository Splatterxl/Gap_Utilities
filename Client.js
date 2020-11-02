let jsonfile = require("jsonfile");
let Discord = require("discord.js");

const fs = require("fs");

let bot = new Discord.Client({
    presence: {
        status: 'dnd'
    }
});

let settings = jsonfile.readFileSync(__dirname + "/settings.json");

settings.writePeriodically = async () =>
{
    setInterval(() => { jsonfile.writeFileSync(__dirname + "/settings.json", settings); console.log("updated settings"); }, 10000);
};

settings.writePeriodically();

bot.login(settings.bot.user.token)