import Discord from "discord.js";
const bot = new Discord.Client();
module.exports = (message) => {
    message.channel.send(":uwu:");
}