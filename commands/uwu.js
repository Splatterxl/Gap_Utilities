const uwu = require("uwu-js")

module.exports.run = (bot, msg, args, db, flags, ctx) => ctx.respond(uwu(args.slice(1).join(" ")));

module.exports.help = {
  name: ">uwu",
  id: "uwu",
  aliases: ["owo"],
  desc: uwu("UwU-ifies text!"),
  category: "fun",
  whitelisted: false,
  example: ">uwu owo UwU TwT"
}
