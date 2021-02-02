/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require("discord.js");
const { readdirSync } = require('fs'), path = require("path");
const template = {
  name: ">template",
  id: "template",
  example: ">template",
  desc: "A template help object",
  aliases: ["yes"],
  whitelisted: false,
  category: "other"
};

module.exports = async () =>
{
  let cmds = new Discord.Collection();
  let errs = [];
  // eslint-disable-next-line no-undef
  for (let file of readdirSync(path.join(__dirname, "..", `commands`)).filter(f => f.endsWith(`.js`)))
  {
    if ((Object.keys(require(`../commands/${file}`)).includes('help')) && Object.keys(require(`../commands/${file}`).help) != Object.keys(template))
    {
      let status = [];
      for (let key of Object.keys(template))
      {
        if (!(key in require(`../commands/${file}`).help)) status.push(`${{ "name": "Name", "id": "ID", "desc": "Description", "aliases": "Alias List", "whitelisted": "Whitelist status", "category": "Category", "example": "Example Usage" }[key]}`);
      }
      if (status !== []) errs.push(`❌ No ${status.join(', ')} provided for file ${file}`);
    }
    try
    {
      cmds.set(file.replace(/\.js/, ''), require(`../commands/${file}`).prototype ? (new (require(`../commands/${file}`))()) : require(`../commands/${file}`));
    } catch (e) { errs.push(e); }
  }
  console.log(`${errs ? errs.length : "No"} errors were found.`);
  console.log(errs);
  global.cmds = cmds;

  return cmds;
}; 
