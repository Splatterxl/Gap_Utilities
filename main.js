let Discord = require("discord.js");
require('dotenv').config();
const firebase = require('firebase'), fs = require('fs'), path = require("path")
let settings = require("./settings.json");
console.info('[STARTUP] Initialising Firebase App...');
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
console.info('[STARTUP] Finished initialising Firebase App.');



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
const embeds = require('./assets/embeds');
// @ts-ignore
global.bot = bot;
/**
 * @type {Discord.Message[]}
 */
// @ts-ignore
global.snipes = new Discord.Collection();

let events = new Discord.Collection();

{
    events.set('message', require('./events/message'));
    events.set('ready', require('./events/ready'));
    
    
    events.set('messageDelete', require('./events/messageDelete'));
    console.info('[STARTUP] Loaded events.');
}

{
    bot.on('guildMemberAdd', async (m) => { console.log('member joined.'); if ((await (db.ref('gbl').get())).val()[m.user.id] && (await (db.ref('gbl-optin').get())).val()[m.guild.id]) { m.user.send("You have joined a guild that has opted-in to the global ban list feature offered by Eureka!. We are sorry to inform you that as a result of this, you are banned from the server. Please contact Splatterxl#8999 to appeal this action with the server's name and your user ID."); m.guild.members.ban(m.user.id).catch(e => null); }  });
    bot.on("ready", () => events.get('ready').run(bot, db));
    bot.on("message", m => events.get('message').run(bot, m, db));
    bot.on('channelCreate', c => events.get('channelCreate')?.run(bot, c, db));
    bot.on('channelDelete', c => events.get('channelDelete').run(bot, c, db));
    bot.on('messageDelete', m => events.get('messageDelete').run(bot, m, db));
    bot.on("guildCreate", g=>{
        settings.settings[g.id] = settings.settings.default;
        fs.writeFileSync('./settings.json', JSON.stringify(settings));
        db.ref(`settings/${g.id}`).set(settings.settings.default);
        // @ts-ignore
        g.channels.cache.find(c => c.name == 'general').send(embeds.newGuild());
    });
    // bot.on('guildBanAdd', async (g, u) => { g.channels.cache.(await g.fetchBan(u)).reason; });
}

bot.login(require("./token"));
