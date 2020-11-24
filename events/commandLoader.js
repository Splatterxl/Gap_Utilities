const Discord = require("discord.js");
const { readdirSync } = require('fs');

let cmds = new Discord.Collection();

for (let file of readdirSync(`./commands`).filter(f => f.endsWith(`.js`)))
{
    cmds.set(file.replace(/\.js/, ''), require(`../commands/${file}`));
}

module.exports = cmds;