const fs = require("fs");
let jsonfile = require("jsonfile");
let Discord = require("discord.js");
// console.log(fs.readdirSync(__dirname + "/handlers/commands"));
// let commands = {
//     get: () =>
//     {
//         for (let item of fs.readdirSync("handlers/commands"))
//         {
//             commands[item] = (item.endsWith(""))
//         }
//     }
// }

let events = {
    message: require("./events/message")
};


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
let updateDependencies = async () =>
{
    setInterval(() =>
    {
        settings = jsonfile.readFileSync(__dirname + "/settings.json"); events = {
            message: require("./events/message")
        };
    }, 1000);
};

updateDependencies();
settings.writePeriodically();

bot.on("message", (msg) =>
{
    events.message.run(bot, msg);

});

bot.login(settings.bot.user.token);