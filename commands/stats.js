const Discord = require('discord.js');
const os = require("os"),fs=require("fs")
module.exports = {
    help: {
        "name": ">stats",
        "id": "stats",
        "aliases": [
            "stats",
            'info'
        ],
        "desc": "Gets the stats of the current hosting device!",
        "example": ">stats"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: (bot, msg, args) =>
    {
        let _ = new Discord.MessageEmbed({
            color: "YELLOW",
            title: "Bot Stats",
            description: "Statistics about the bot.",
            fields: [
                {name:"Node.js version",value:process.version,inline:true},
                {name:"Discord.js version",value:Discord.version,inline:true},
                {name:"Total Commands",value:fs.readdirSync(__dirname).length,inline:true},
                {name:"Total Cached Guilds",value:bot.guilds.cache.size,inline:true},
                {name:"Total Cached Users",value:bot.users.cache.size,inline:true},
                {name:"Total Cached Channels",value:bot.channels.cache.size,inline:true}
                
            ],
            thumbnail:{url:bot.user.avatarURL()},
            image:{url:"https://voidbots.net/api/embed/"+bot.user.id}
        });
        msg.channel.send(_);
        msg.react('✅');
    }
};
