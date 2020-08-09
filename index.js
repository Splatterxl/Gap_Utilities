const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const activities_list = [
    "to Splatterxl and Robotic Press", 
    "to your feedback",
    "to the o!help command", 
    "to DiscordJS",
    "to your commands"
]; // creates an arraylist containing phrases you want your bot to switch through.

client.on("ready", () => {
    console.log("Logged in as " + client.user.username + ".");
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], {"type": "LISTENING"}); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

client.on("message", message => {
    if (message.author.bot) return;
    message.react("✅");
    if (config.scanEnabled) {
        message.delete();
        const msgBeforeEdit = message.content;
        // ^^^ This needs to be decalred as constant if it doesn't get changed (if it does change it to let)
        message.channel.send("Scanning Message... (OmniBotAPI)")
        message.channel.send(`Message Approved: "${message.content}" (Scanned because property "explicitContentFilter" is equal to "DISABLED"`);
    }
    const prefix = 'o!';
    if (!message.content.startsWith(prefix)) return;
    if (message.content == "o!ping") {
        client.commands.get('ping').execute(message, new Discord.MessageEmbed()
            .setColor('#0099ff').setTitle("🏓Ping!").addField("Online!", "OmniBot Is Online (Yay!)"));
    }
    if (message.content.startsWith("o!config scan ")) {
        if (message.content == "o!config scan true") {
            config.scanEnabled = true;
            // you do the '\(insert quote here)' if you use it in declaring the string (const string = 'Potato\'s mansion')
            // and I suggest using `` if you are going to put a variable inside the string like `Message Approved: ${msgBeforeEdit} (rest of string)`
            message.channel.send("Property `scan` successfully updated to `true`.")
            message.channel.send("All messages sent after this will be automatically scanned.")
            message.channel.send("This feature is purely comic relief although it will become quite annoying.")
        } else if (message.content == "o!config scan false") {
            // Checking variables or strings uses == not =, = is used for declaration
            config.scanEnabled = false;
            message.channel.send("Property `scan` successfully updated to `false`.")
        }
    }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    newMessage.channel.send(new Discord.MessageEmbed().setTitle("Message Edited").addField("We saw that a message was edited!", `A message was Edited in this channel:\n**Before**: \`${oldMessage}\`\n**After**: \`${newMessage}\``));
});

client.login(config.token);
