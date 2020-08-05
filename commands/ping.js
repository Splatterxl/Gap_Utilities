const { DiscordAPIError } = require("discord.js")

module.exports = {
    name: 'config',
    description: "This command can be used to fuddle around with various settings.",
    execute(message, embed){
        message.channel.send("🏓Pong!" + embed);
    }
}