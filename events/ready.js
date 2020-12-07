const Discord = require("discord.js");
// const { global } = require('node/g


module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
    */
    run: async (bot) =>
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
        // @ts-ignore
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