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
        console.info('[PRE-FLIGHT] Loaded commands.');
        // @ts-ignore
        global.voidbots = new (require('voidbots'))('qDpCJCMoJjiS4kXjMH3D544yp8YtJpDHpdixPZ6Rfr4m', {
            statsInterval: 1000000
        },
            bot);
        // @ts-ignore
        global.voidbots.postStats(bot.guilds.cache.size);
        console.info('[PRE-FLIGHT] Posted guild size to VoidBots');
        console.info('[READY] Finished startup.');
    }
};