const Discord = require('discord.js');
const error = require("../assets/Error");

module.exports = {
    help: {
        "name": ">eval",
        "id": "eval",
        "aliases": [
            "test",
            "eval",
            "jseval",
            "jstest"
        ],
        "desc": "A little evaluation command! (Restricted to owner.)",
        "example": ">eval console.log(\"An Example.\")"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     * @param {string[]} args
     */
    run: (bot, msg, args) =>
    {
        let raw = msg.content.slice(5);
        let evalOutput = eval(raw);
        if (!(require("../whitelist").includes(msg.author.id)) || !(msg.member.hasPermission("ADMINISTRATOR"))) return msg.channel.send("nope");
        // try { evalOutput = eval(raw); } catch (e) { msg.reply(e); }
        if (evalOutput.includes(bot.token)) return msg.reply("oh no you don't!");
        let _ = new Discord.MessageEmbed()
            .setTitle("UtilityBot Evaluation")
            .setColor("black")
            .setDescription("Here is your evaluated code.")
            .addField("📥 Input", `\`\`\`js\n${raw}\`\`\``)
            .addField("📤 Output", `\`\`\`js\n${evalOutput}\`\`\``);
        msg.channel.send([`There is an embed attached to this message. If you can't see it, check your settings under \`Text and Images\`. If you can't see it after that, an admin may have deleted the embed.`, _]);
    }
};;;