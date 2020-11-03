let Discord = require("discord.js");
let child_process = require("child_process");
let { CommandError } = require("../assets/Error");

module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     * @param {string[]} args
     */
    run: (bot, msg, args) =>
    {
        let proc = child_process.spawn(msg.content.slice(5));

        try { msg.channel.send([proc.stdout, proc.stderr]); } catch (err)
        {
            msg.channel.send(new Discord.MessageEmbed().setTitle("An Error occurred.").setDescription(new CommandError("unix", err, "<unsupported> Not Supported").parsed));
        }
    }
};