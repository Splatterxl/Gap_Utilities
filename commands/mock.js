const Discord = require('discord.js');


module.exports.run = (bot, msg, args) => msg.reply(((str) => { let a = []; str.split("").forEach((v) => a.push(Math.round(Math.random()) == 1 ? v.toUpperCase() : v.toLowerCase(0))); return a.join(""); })(args.slice(1).join(' ')), {

});
module.exports.alias = true;