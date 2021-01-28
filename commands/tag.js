const tags = require("../misc/tags.json"),
  Discord = require("discord.js")

module.exports.run = async (bot, msg, args, db, flags, ctx) => { 

switch (args[1]) {
  case "list":
    ctx.respond(new Discord.MessageEmbed({
      title: `Tags in ${ctx.guild.name}`,
      description: Object.entries(db.get('tags')[`g${msg.guild.id}`] ?? ({",,,none,,,": null})).map(v => v[0] == ",,,none,,," ? "None" : `\`${v[0]}\``).join(" | "),
      color: "YELLOW"
    }))
    break;
    // <:greenTick:796095828094615602>
    // <:redTick:796095862874308678>
  case "edit":
  case "create":
    if (!args[2]) return ctx.respond("<:redTick:796095862874308678> You need to specify a name!")
    if (!args[3]) return ctx.respond("<:redTick:796095862874308678> You need to specify some text!")
    if (db.get(`tags.g${msg.guild.id}.${args[2]}`) && db.get(`tags.g${msg.guild.id}.${args[2]}`).author != msg.author.id) return ctx.respond("<:redTick:796095862874308678> You don't own that tag!")
    db.set(`tags.g${msg.guild.id}.${args[2]}`, { content: args.slice(3).join(" "), author: msg.author.id, name: args[2], createdAt: Date(), createdTimestamp: Date.now() });
    ctx.respond(new Discord.MessageEmbed({
      color: "GREEN",
      description: `<:greenTick:796095828094615602> Successfully created tag \`${args[2]}\`.`
    }))
    break;
  case "delete":
  case "remove":
    if (db.get(`tags.g${msg.guild.id}.${args[2]}`) && db.get(`tags.g${msg.guild.id}.${args[2]}`).author != msg.author.id) return ctx.respond("<:redTick:796095862874308678> You don't own that tag!")
    db.delete(`tags.g${msg.guild.id}.${args[2]}`);
    ctx.respond(new Discord.MessageEmbed({
      color: "GREEN",
      description: `<:greenTick:796095828094615602> Successfully deleted tag \`${args[2]}\`.`
    }))
    break;
  case "show":
  default:
   const tag = db.get(`tags.g${msg.guild.id}.${args[args[1] == "show" ? 2 : 1]}`);
   if (tag) ctx.respond(new Discord.MessageEmbed({
      color: "YELLOW",
      description: tag.content,
      footer: { text: `By ${(await ctx.client.users.fetch(tag.author).catch(e => null))?.tag}` },
      timestamp: tag.createdTimestamp
   }))
   else ctx.respond("Invalid usage; should be `tag [list|create|show]` or `tag <name of tag>`")
   break;
  
}

};

module.exports.help = {
        "name": ">tag",
        "id": "tag",
        "aliases": [
            "t"
        ],
        "desc": "get a tag from our json file its ez af",
        "example": ">tag list",
        "category": "utility",
        "whitelisted": false
    }
