let Discord = require("discord.js");
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

let bot = new Discord.Client({
    presence: {
        status: 'dnd'
    }
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
    bot.on("ready", () => events.get('ready').run(bot));
    bot.on("message", m => events.get('message').run(bot, m));
    bot.on('messageUpdate', (o, n) => events.get('messageUpdate').run(bot, o, n));
    bot.on('channelCreate', c => events.get('channelCreate').run(bot, c));
    bot.on('channelDelete', c => events.get('channelDelete').run(bot, c));
    bot.on('messageDelete', m => events.get('messageDelete').run(bot, m));
    bot.on('guildCreate', g =>
    {
        settings.settings[g.id] = settings.settings.default;
        fs.writeFileSync('./settings', JSON.stringify(settings));
        // @ts-ignore
        g.channels.cache.find(c => c.name == 'general').send(embeds.newGuild());
    });
    // bot.on('guildBanAdd', async (g, u) => { g.channels.cache.(await g.fetchBan(u)).reason; });
}

bot.login(settings.bot.user.token);