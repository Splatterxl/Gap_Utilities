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
    }
};