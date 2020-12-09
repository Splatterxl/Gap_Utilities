const Discord = require("discord.js");
const firebase = require('firebase');
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
     * @param {firebase.default.database.Database} db
    */
    run: async (bot, db) =>
    {

        console.log(`[PRE-FLIGHT] ${bot.user.tag} is online!`);
        // @ts-ignore
        global.settings = require('../settings.json');
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