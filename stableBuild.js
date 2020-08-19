const Discord = require("discord.js");
const bot = new Discord.Client({
    "presence": {
        "status": "dnd"
    }
});
const random = require("random")
const config = require("./config.json");
var stats = {};
const prevMessage = null;

const fs = require("fs");

const commands = new Discord.Collection();

let PingMessageSent = 0;

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    commands.set(command.name, command);
}

const events = new Discord.Collection();

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for(const file of eventFiles){
    const event = require(`./events/${file}`);
 
    events.set(event.name, event);
}


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
        bot.user.setActivity(activities_list[index], {
            "type": TYPE
        }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

bot.on("message", message => {
    if (prevMessage != "NOOONONON" && message.content === "Fetching Latencies..." && message.author.tag === bot.user.tag) {
        var editLatency = PingMessageSent - new Date().now;
        message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle("🏓 Pong!").addField("Latencies", `WebSocket Latency: \`${bot.ws.ping.toLocaleString()}ms\`, Edit Latency: \`${editLatency}\``, true));
        message.delete();
        prevMessage = "NOOONONON"
    }

    if (message.author.bot) return;

    var args = message.content.split(/ +/);

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

        message.channel.send("Fetching Latencies...");
        PingMessageSent = new Date().now;

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
        
        // message.channel.send(new Discord.MessageEmbed().setTitle("You want Support?").addField("We got support!", "https://discord.gg/heD2x2K is the link!", false).setFooter("Haha you don't know how to use this bot!"))

    } else if (message.content == "u!uwu") {

        message.channel.send("**UwU**");

    } else if (message.content.startsWith("u!help")) {

        if (message.content === "u!help") {
            message.channel.send(new Discord.MessageEmbed()
                .setTitle("Help")
                .addField("Coming Soon", "", false)
                .setFooter("Haha you don't know the commands")
            );
        } else if (message.content == "u!help user") {
            message.channel.send(new Discord.MessageEmbed().setTitle("Coming Soon:tm:..."))
        }

    } else if (message.content == "u!e") {

        message.channel.send("e");

    } else if (message.content == "u!botInfo") {
        
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Bot Info")
        .addField("Bot Name", "Gap Utilities", true)
        .addField("NodeJS Version", "`v12.18.3`", true)
        .addField("DiscordJS Version", "`v12.2.0`", true)
        .addField("Uptime", `${bot.uptime.toLocaleString()}`, true)
        .addField("Ping", `${bot.ws.ping.toString()}ms`, true)
        .setFooter("More Info Coming Soon™"))
    };

    // XP

    if (message.guild.id in stats === false) {
        stats[message.guild.id] = {
            guildName: message.guild.name,
        }
    }

    var guildStats = stats[message.guild.id];
    if (message.author.id in guildStats === false) {
        guildStats[message.author.id] = {
            xp: 0,
            level: 0,
            last_message: 0
        }
    }

    var userStats = guildStats[message.author.id];
    userStats.xp += random.int(15, 25);

    console.log(`${message.author.tag} now has ${userStats.xp}.`);

    prevMessage = message;
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

class Commands {
    constructor() {
        this.help = require("../commands/help");
        this.ping = require("../commands/ping");
        this.verify = require("../commands/verify");
        this.uwu = require("../commands/uwu");
        this.f = require("../commands/f");
        this.botInfo = require("../commands/botInfo");
    }
}

bot.login(config.botInfo.token);