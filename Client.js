const Discord = require("discord.js");
class Client extends Discord.Client {
    constructor() {
        /**
         * Dependecies
         */
        this.Discord = require("discord.js")
        this.random = require("random")
        this.fs = require("fs");
        this.jsonfile = require("jsonfile");

        /**
         * Bot Variables
         */
        this.config = require("./config.json");
        this.stats = {};
        this.prevMessage = undefined;
        this.PingMessageSent = 0;
        this.activities_list = [
            "Splatterxl",
            "your feedback",
            "JavaScript",
            "your commands",
            "u!help",
            "NOTICE ME SENPAI!!!!"
        ];
        this.events = new Events();

        this.on("ready", () => {
            console.log(`Logged in as ${this.user.tag}.`);
            setInterval(() => {
                this.index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
                let TYPE = (activities_list[index] === "NOTICE ME SENPAI!!!!") ? "CUSTOM_STATUS" : "LISTENING";
                this.user.setActivity(activities_list[index], {
                    "type": TYPE
                }); // sets bot's activities to one of the phrases in the arraylist.
            }, 10000); // Runs this every 10 seconds.
            events.events.ready(Discord, bot, activities_list)
        });

        this.on("message", message => {

            processMessages(message)

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

        this.on("messageUpdate", (oldMessage, newMessage) => {
            if (oldMessage.author.bot) return;
            newMessage.channel.send(new Discord.MessageEmbed().setTitle("Message Edited").addField("We saw that a message was edited!", `A message was Edited in this channel:\n**Before**: \`${oldMessage}\`\n**After**: \`${newMessage}\``));
            processMessages(newMessage);
        });

        function processMessages(message) {

            function checkForExceptions() {
                if (prevMessage != "NOOONONON" && message.content === "Fetching Latencies..." && message.author.tag === this.user.tag) {
                    var editLatency = PingMessageSent - new Date().now;
                    message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle("🏓 Pong!").addField("Latencies", `WebSocket Latency: \`${this.ws.ping.toLocaleString()}ms\`, Edit Latency: \`${editLatency}\``, true));
                    message.delete();
                    prevMessage = "NOOONONON";
                }

                if (message.author.bot) return;

                if (config.settings.global.reactOnSend) {
                    message.react("✅"); // reacts as soon as a message is sent.
                }

                if (config.settings.global.scanEnabled) {
                    message.delete();
                    this.msgBeforeDelete = message.content;
                    message.channel.send(new Discord.MessageEmbed().setTitle("Scanning Message...").addField("Comic Relief Scan is running...", " ", false).setFooter("Why did you turn this on?"))
                    message.channel.send(new Discord.MessageEmbed().setTitle("Scan Complete!").addField(`Message Approved:`, `\`"${message.content}"\``, false).setFooter("Is it annoying yet?"));
                }

            }

            var args = message.content.split(/ +/);

            console.log(`${message.author.username}#${message.author.discriminator} sent: "${message.content}" in text channel #${message.channel.name} in Guild ${message.guild.name}.`)

            // ^^^ for local testing

            function processCommands() {

                switch (message.content) {
                    case "u!ping":
                        /**
                         * Ping Command
                         */
                        message.channel.send("Fetching Latencies...");
                        PingMessageSent = new Date().now;

                        // sends an embed back
                        break;
                        /**
                         * Configuration Command
                         */
                    case "u!config scan true":
                        function configurationChange()
                    default:
                        if (message.content.startsWith("u!config scan ")) {
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

                            if (message.content == "u!help") {
                                message.channel.send(new Discord.MessageEmbed()
                                    .setTitle("Help")
                                    .addField("Coming Soon", "", false)
                                    .setFooter("Haha you don't know the commands")
                                );
                            } else if (args[1] == "user") {
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
                                .addField("Uptime", `${this.uptime.toLocaleString()}`, true)
                                .addField("Ping", `${this.ws.ping.toString()}ms`, true)
                                .setFooter("More Info Coming Soon™"))
                        };
                        break;
                }
            }

            let commands = {
                config = function (item, value) {
                    switch (item) {
                        case "scan":
                            switch (value) {
                                case true:
                                    config.settings.global.scanEnabled = true;
                                    break;
                                case false:
                                    config.settings.global.scanEnabled = true;
                                    break;
                            }
                            break;
                        case "react":
                            switch (value) {
                                case true:
                                    config.setting
                            }
                    }
                }
            }

            checkForExceptions();
            processCommands();

            jsonfile.writeFileSync("./config.json", config);
        };

        /**
         * 
         * Links the this.on() event files.
         * 
         */

        class Events extends Client {
            constructor() {
                this.events = {
                    message = require("./events/message"),
                    messageUpdate = require("./events/messageUpdate"),
                    ready = require("./events/ready").default,
                    commands = {
                        f = require("./events/commands/f"),
                        help = require("./stableBuild")
                    }
                };
            }
        }

        this.login(config.botInfo.token);
    }
}

this.bot = new Client