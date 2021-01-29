module.exports = {
  help: {
    name: ">clap",
    id: "clap",
    desc: "👏 Make 👏 stuff 👏 like 👏 this 👏",
    aliases: [ "👏" ],
    category: "fun",
    whitelisted: false
  },
  run: (bot, msg, args, db, flags, ctx) => ctx.respond([ "", ...(args.slice(1).join(" ").split(/ +/) || "Give me some text to clap-ify"), ""].join(" 👏 "))
}
