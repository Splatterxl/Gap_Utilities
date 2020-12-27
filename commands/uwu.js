const uwu = require("uwu-js")

module.exports.run = (bot, msg, args) => msg.reply(uwu(args.slice(1).join(" ")))
