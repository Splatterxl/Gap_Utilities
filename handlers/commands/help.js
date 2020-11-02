const {
    MessageEmbed
} = require("discord.js");

module.exports = (message) => {
    switch (message.content) {
        case "u!help":
            message.channel.send(new MessageEmbed()
                .setTitle("Help")
                .addField("Coming Soon", "", false)
                .setFooter("Haha you don't know the commands")
            );
            return console.log(`Completed ${message.content}.`)
        case "u!help user":
            message.channel.send(new MessageEmbed().setTitle("Coming Soon:tm:..."))
            return console.log(`Completed ${message.content}`)
        default:
            return console.log(`Could not find "u!help" variant for ${message.content}`)
    }
}