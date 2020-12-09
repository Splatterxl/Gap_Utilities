let Discord = require("discord.js");
require('dotenv').config();
const firebase = require('firebase');
// @ts-ignore
let settings = require("./settings.json");
// console.log(fs.readdirSync(__dirname + "/handlers/commands"));
// let commands = {
//     get: () =>
//     {
//         for (let item of fs.readdirSync("handlers/commands"))
//         {
//             commands[item] = (item.endsWith(""))
//         }
//     }
// }


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDfUOE2_0S46m5XGEcR5LV8JlK08BDSNgE",
    authDomain: "eureka-discordjs.firebaseapp.com",
    databaseURL: "https://eureka-discordjs-default-rtdb.firebaseio.com",
    projectId: "eureka-discordjs",
    storageBucket: "eureka-discordjs.appspot.com",
    messagingSenderId: "388372676034",
    appId: "1:388372676034:web:deee0b1ca93b9e7ca8ea5b",
    measurementId: "G-RPP39NJF8V"
};
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
let db = firebase.default.database();
db.goOnline();



let bot = new Discord.Client({
    presence: {
        status: 'dnd',
        activity: {
            name: 'my system load...',
            type: 'LISTENING'
        }
    },
    partials: ['GUILD_MEMBER', 'MESSAGE', 'CHANNEL']
});
let fs = require('fs');
const embeds = require('./assets/embeds');
global.bot = bot;

let events = new Discord.Collection();

{
    events.set('message', require('./events/message'));
    events.set('messageUpdate', require('./events/messageUpdate'));
    events.set('ready', require('./events/ready'));
    events.set('channelCreate', require('./events/channelCreate'));
    events.set('channelDelete', require('./events/channelDelete'));
    events.set('messageDelete', require('./events/messageDelete'));
}

{
    bot.on("ready", () => events.get('ready').run(bot, db));
    bot.on("message", m => events.get('message').run(bot, m, db));
    bot.on('messageUpdate', (o, n) => events.get('messageUpdate').run(bot, o, n));
    bot.on('channelCreate', c => events.get('channelCreate').run(bot, c));
    bot.on('channelDelete', c => events.get('channelDelete').run(bot, c));
    bot.on('messageDelete', m => events.get('messageDelete').run(bot, m));
    bot.on('guildCreate', g =>
    {
        settings.settings[g.id] = settings.settings.default;
        fs.writeFileSync('./gap_utilities/settings.json', JSON.stringify(settings));
        // @ts-ignore
        g.channels.cache.find(c => c.name == 'general').send(embeds.newGuild());
    });
    // bot.on('guildBanAdd', async (g, u) => { g.channels.cache.(await g.fetchBan(u)).reason; });
}

bot.login(settings.bot.user.token);