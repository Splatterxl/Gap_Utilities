const Discord = require('discord.js');

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
        let _ = new Discord.MessageEmbed()
            .setAuthor("utilitybot")
            .setColor("black")
            .setDescription("Here is your evaluated code.")
            .addField("📥 Input", `\`\`\`js\n${raw}\`\`\``)
            .addField("📤 Output", `\`\`\`js\n${evalOutput}\`\`\``);
        msg.channel.send(_);
    }
};;;