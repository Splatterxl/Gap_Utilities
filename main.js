const fs = require("fs");
let jsonfile = require("jsonfile");
let Discord = require("discord.js");
console.log(fs.readdirSync("handlers/commands"));
// let commands = {
//     get: () =>
//     {
//         for (let item of fs.readdirSync("handlers/commands"))
//         {
//             commands[item] = (item.endsWith(""))
//         }
//     }
// }


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

bot.on("message", (msg) =>
{

});

bot.login(settings.bot.user.token);