const embeds = require("../assets/embeds"),
  idify = require("../assets/idify"),
  crs = require("crypto-random-string")

module.exports = {
  run: async (bot, msg, args, db, flags) => {
    if (!(msg.member.permissions.has("BAN_MEMBERS") && msg.member.permissions.has("KICK_MEMBERS"))) if (!(require("../whitelist").includes(msg.author.id))) return msg.reply(embeds.userPermissionsMissing("perm:(kick&&ban)_members"));
    if (!args[1]) return msg.reply("Incorrect usage: should have at least one parameter (`Snowflake | Mention`)");
    if (idify(args[1])===msg.author.id) return msg.reply("Don't warn yourself, dumdum")
    let str = crs({length:5});
    
    if (!(await db.ref(`warns/${msg.guild.id}`).get()).val()) db.ref(`warns/${msg.guild.id}`).set({"e":"e"});
    db.ref(`warns/${msg.guild.id}/${idify(args[1])}/${str}`).set({moderator:msg.author, reason: args[2] ? args.slice(2).join(" ") : "No reason provided."});
    if (flags?.includes("ban") && (await msg.guild.members.fetch(idify(args[1]))).bannable) (await msg.guild.members.fetch(idify(args[1]))).ban({reason:`[ Warn by ${msg.author.tag} with flag '--ban' ] ${args[2]?args.slice(2).join(" "):"No reason specified."}`})
    msg.reply(`Successfully warned **${(await bot.users.fetch(idify(args[1]))).tag}** for \`${(await db.ref(`warns/${msg.guild.id}/${idify(args[1])}/${str}/reason`).get()).val()}\`.`)
  }
}
