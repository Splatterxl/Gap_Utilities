const Discord = require("discord.js");
const { readdirSync } = require('fs'), path = require("path")
let ascii = require('ascii-table');

let table = new ascii('Command', 'Loaded');

module.exports = (nope) =>
{
    let cmds = new Discord.Collection();

    for (let file of readdirSync(path.join(__dirname, "..", `commands`)).filter(f => f.endsWith(`.js`)))
    {
        table.addRow(file, ((require(`../commands/${file}`)).run && (require(`../commands/${file}`)).help) ? '✅ Command loaded!' : '❌ Command not loaded correctly.');
        cmds.set(file.replace(/\.js/, ''), require(`../commands/${file}`));
    };
    if (!nope) console.log(table.toString());
    // @ts-ignore
    global.cmds = cmds;

    aliases(true);
    return cmds;
};

async function aliases (silent) {
  let aliases = new Discord.Collection()
  for (let file of fs.readdirSync(path.join(__dirname, "..", "commands")).filter(f=>f.endsWith(".js") && require("f").help?.aliases)) {
    aliases.set(file, require("../commands/"+file).help?.aliases).catch(e=>null);
  }
  return global.aliases = aliases
}
