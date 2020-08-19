const Discord = require("discord.js");
const bot = new Discord.Client({
    "presence": {
        "status": "dnd"
    }
});
const config = require("./config.json");
// const event = new Events();

const activities_list = [
    "Splatterxl",
    "your feedback",
    "JavaScript",
    "your commands",
    "u!help",
    "NOTICE ME SENPAI!!!!"
]; // creates an arraylist containing phrases the bot will switch through.

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}.`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        let TYPE = (activities_list[index] === "NOTICE ME SENPAI!!!!") ? "CUSTOM_STATUS" : "LISTENING";
        bot.user.setActivity(activities_list[index], {"type": TYPE}); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

bot.on("message", message => {
    event.message(message);
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
    event.messageUpdate(oldMessage, newMessage);
});


/*function Events () {
    this.ready = require("./events/ready");
    this.message = require("./events/message");
    this.messageUpdate = require("./events/messageUpdate");
}*/




bot.login(config.botInfo.testing.token);