import Discord from "discord.js";
const bot = new Discord.Client;

module.exports = {
    name: "help command.",
    execute(message) {
        if (message.content === "u!help") {
            message.channel.send(new Discord.MessageEmbed()
                .setTitle("Help")
                .addField("Coming Soon", "", false)
                .setFooter("Haha you don't know the commands")
            );
        } else if (message.content == "u!help user") {
            message.channel.send(new Discord.MessageEmbed().setTitle("Coming Soon:tm:..."))
        }
    }
}