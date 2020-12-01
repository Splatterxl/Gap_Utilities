const Discord = require("discord.js");
const { readdirSync } = require('fs');
let ascii = require('ascii-table');

let table = new ascii('Command', 'Loaded');

module.exports = () =>
{
    let cmds = new Discord.Collection();

    for (let file of readdirSync(`./gap_utilities/commands`).filter(f => f.endsWith(`.js`)))
    {
        table.addRow(file, ((require(`../commands/${file}`)).run && (require(`../commands/${file}`)).help) ? '✅ Command loaded!' : '❌ Command not loaded correctly.');
        cmds.set(file.replace(/\.js/, ''), require(`../commands/${file}`));
    };
    console.log(table.toString());
    global.cmds = cmds;
    return cmds;
};
