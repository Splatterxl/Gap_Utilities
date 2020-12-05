const Discord = require("discord.js");
// const { global } = require('node/g

let activities = [
    "with JavaScript",
    "some music",
    `Node.js version ${process.version}`,
    `Discord.js version ${Discord.version}`,
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "with my pp"
];

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
    */
    run: async (bot) =>
    {
        global.settings = require('../settings.json');
        console.log(`[READY] ${bot.user.tag} is online!`);

        // @ts-ignore
        global.presenceInterval = setInterval(() =>
        {
            bot.user.setActivity({
                name: activities[Math.floor(Math.random() * activities.length)],
                type: "PLAYING",

            });
        }, 10000);

        (require('./commandLoader'))(false);
    }
};