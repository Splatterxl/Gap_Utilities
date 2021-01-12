let Discord = require("discord.js");

module.exports = {

    CommandError: class
    {
        constructor (command, err, uncaught)
        {
            this.command = command;
            this.err = err;
            this.parsed = `${(uncaught) ? "Uncaught" : ""} Error at CommandHandler for ${command}: ${err}`;
        }
    },
    InsufficientPermissions: class { },
    HardcodedWhitelistError: class
    {
        constructor (command, id)
        {
            this.result = new Discord.MessageEmbed()
                .setTitle(`An Error occurred in the CommandHandler for \`${command}\``)
                .addField(`Message`, `\`\`\`\nHardcodedWhitelistError: You are not whitelisted to use this command.\`\`\``)
                .addField(`Code`, `\`\`\`ENOTWHITELISTED ${id}\`\`\``)
                .setFooter(`ENOTWHITELISTED`);
        }
    }
};