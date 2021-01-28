const tags = require("../misc/tags.json");

module.exports.run = async (bot, msg, args, db, flags, ctx) => { 

switch (args[1]) {
  case "list":
    ctx.respond(new Discord.MessageEmbed({
      title: `Tags in ${ctx.guild.name}`,
      description: Object.entries(db.get('tags')[`g${msg.guild.id}`] ?? ({",,,none,,,": null})).map(v => v[0] == ",,,none,,," ? "None" : `\`${v[0]}\``).join(" | "),
      color: "YELLOW"
    }))
}

};

module.exports.help = {
        "name": ">tag",
        "id": "tag",
        "aliases": [
            
        ],
        "desc": "get a tag from our json file its ez af",
        "example": ">tag list",
        "category": "utility",
        "whitelisted": false
    }
