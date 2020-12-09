const Discord = require("discord.js");
const firebase = require('firebase');
// const { global } = require('node/g


module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {firebase.default.database.Database} db
    */
    run: async (bot, db) =>
    {
        let activities = [
            "with JavaScript",
            "some music",
            `Node.js version ${process.version}`,
            `Discord.js version ${Discord.version}`,
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "with my pp",
            `Ping me for help!`,
            `${bot.users.cache.size} Users!`
        ];

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