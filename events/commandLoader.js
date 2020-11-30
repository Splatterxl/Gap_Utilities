const Discord = require("discord.js");
const { readdirSync } = require('fs');



module.exports = () =>
{
    let cmds = new Discord.Collection();

    for (let file of readdirSync(`./gap_utilities/commands`).filter(f => f.endsWith(`.js`)))
    {
        cmds.set(file.replace(/\.js/, ''), require(`../commands/${file}`));
    };

    return cmds;
};