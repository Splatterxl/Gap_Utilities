const Discord = require("discord.js"),
  firebase = require('firebase'),
  moment = require("moment")
// const { global } = require('node/g

let activities = [
    "some music",
    `Node.js version ${process.version}`,
    `Discord.js version ${Discord.version}`,
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
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
        global.voidbots = new (require('voidbots'))('qDpCJCMoJjiS4kXjMH3D544yp8YtJpDHpdixPZ6Rfr4m' /* this is an old API token */, {
            statsInterval: 1000000
        },
            bot);
        // @ts-ignore
        global.voidbots.postStats(bot.guilds.cache.size).catch(e => null);
        console.info('[PRE-FLIGHT] Posted guild size to VoidBots');
        console.info('[READY] Finished startup.');
        const updatem = db.get("updatem")?.split("-");
        if (updatem)
        {
            (await (await bot.channels.fetch(updatem[0]).catch(e => null))?.messages.fetch(updatem[1]))?.edit(":wave: Honey, I'm home!").catch(e => null);
        }
        Object.entries(db.get("reminders")).forEach(([K,V]) => V.forEach((V, K) => setTimeout(() => bot.channels.fetch(V.channel).then(channel => channel.send(`<@${V.author}>, ${moment(V.created).fromNow()}. \n${V.content}\n\n${V.link}`).then(() => db.delete(`reminders.${msg.author.id}.${index}`))), V.time <= Date.now() ? 1000 : V.time - Date.now())))
    }
};
