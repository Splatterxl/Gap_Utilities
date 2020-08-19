const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
// const event = new Events();
const packageJSON = require("./package.json")

const activities_list = [
    "Splatterxl",
    "your feedback",
    "JavaScript",
    "your commands",
    "u!help",
    "NOTICE ME SENPAI!!!!"
]; // creates an arraylist containing phrases the bot will switch through.

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.username}#${bot.user.disciminator}.`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        let TYPE = (activities_list[index] === "NOTICE ME SENPAI!!!!") ? "CUSTOM_STATUS" : "LISTENING";
        bot.user.setActivity(activities_list[index], {
            "type": TYPE
        }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

bot.on("message", message => {
    if (message.author.bot) return;

    console.log(`${message.author.username}#${message.author.discriminator} sent: "${message.content}" in text channel #${message.channel.name} in Guild ${message.guild.name}.`)

    // ^^^ for local testing

    if (config.settings.reactOnSend) {
        message.react("✅"); // reacts as soon as a message is sent.
    }

    if (config.scanEnabled) {
        message.delete();
        const msgBeforeDelete = message.content;
        message.channel.send(new Discord.MessageEmbed().setTitle("Scanning Message...").addField("Comic Relief Scan is running...", " ", false).setFooter("Why did you turn this on?"))
        message.channel.send(new Discord.MessageEmbed().setTitle("Scan Complete!").addField(`Message Approved:`, `\`"${message.content}"\``, false).setFooter("Is it annoying yet?"));
    }

    if (message.content == "u!ping") {
        message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle("🏓Ping!").addField("Online!", "OmniBot Is Online (Yay!)"));

        // sends an embed back

    } else if (message.content.startsWith("u!config scan ")) {
        if (message.content == "u!config scan true") {
            config.scanEnabled = true;
            message.channel.send(new Discord.MessageEmbed().setTitle("Scan Enabled").addField("All messages sent after this will be automatically scanned.", "This feature is purely comic relief although it will become quite annoying."))

            // confirms the change

        } else if (message.content == "u!config scan false") {
            // Checking variables or strings uses == not =, = is used for declaration
            config.scanEnabled = false;
            message.channel.send("Property `scan` successfully updated to `false`.")
        }
    } else if (message.content == "u!support") {
        message.channel.send(new Discord.MessageEmbed().setTitle("You want Support?").addField("We got support!", "https://discord.gg/heD2x2K is the link!", false).setFooter("Haha you don't know how to use this bot!"))
    } else if (message.content == "u!uwu") {
        message.channel.send("**UwU**");
    } else if (message.content.startsWith("u!help")) {
        commands.help(message);
    } else if (message.content == "u!f") {
        message.channel.send("f")
    } else if (message.content == "u!botInfo") {
        message.channel.send(new Discord.MessageEmbed().setTitle("Bot Info").addField("Developer", "@SplatterxlYT", false).addField("Helped By", "@Robotic Press", false).addField(""))
    };

    function Commands() {
        this.help = require("../commands/help");
        this.ping = require("../commands/ping");
        this.verify = require("../commands/verify");
        this.uwu = require("../commands/uwu");
        this.f = require("../commands/f");
        this.botInfo = require("../commands/botInfo");
    }
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    newMessage.channel.send(new Discord.MessageEmbed().setTitle("Message Edited").addField("We saw that a message was edited!", `A message was Edited in this channel:\n**Before**: \`${oldMessage}\`\n**After**: \`${newMessage}\``));
});

/*
function Events() {
    this.ready = require("./events/ready");
    this.message = require("./events/message");
    this.messageUpdate = require("./events/messageUpdate");
}
*/



bot.login(config.botInfo.token);