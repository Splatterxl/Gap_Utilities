const tags = require("../misc/tags.json");

module.exports.run = async (bot, msg, args, db, flags, ctx) => { if (args[1]) ctx.respond(tags.global[args[1]] ? tags.global[args[1]].replace(/!!{botid}!!/g, bot.user.id) : "No such tag!"); };

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
