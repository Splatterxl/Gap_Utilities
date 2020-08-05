const Discord = require("discord.js");
const client = new Discord.Client();
const config = new Config();

const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

const updatedNow = true;

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Logged in as " + client.user.username + ".");
});

client.on("message", message => {
    if (message.author.bot) return;
    message.react("✅");
    if (config.scanEnabled) {
        message.delete();
        msgBeforeEdit = message.content;
        message.channel.send("Scanning Message... (OmniBotAPI)")
        message.channel.send("Message Approved: \"" + msgBeforeEdit + "\" (Scanned because property \"explicitContentFilter\" is equal to \"DISABLED\"");
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
            message.channel.send("Property \`scan\` successfully updated to \`true\`.")
            message.channel.send("All messages sent after this will be automatically scanned.")
            message.channel.send("This feature is purely comic relief although it will become quite annoying.")
        } else if (message.content = "o!config scan false") {
            config.scanEnabled = false;
            message.channel.send("Property \`scan\` successfully updated to \`false\`.")
        }
    }
});

class Config {
    constructor() {
        this.scanEnabled = false;
    }
}

client.login(process.env.TOKEN);
