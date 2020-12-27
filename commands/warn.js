const embeds = require("../assets/embeds"),
  idify = require("../assets/idify");

module.exports = {
  run: async (bot, msg, args, db) => {
    if (!(msg.author.permissions.has("BAN_MEMBERS") && msg.member.permissions.has("KICK_MEMBERS"))) if (msg.author.tag !== "Splatterxl#8999") {} else return msg.reply(embeds.userPermissionMissing("perm:(kick&&ban)_members"));
    if (!args[1]) return msg.reply("Incorrect usage: should have at least one parameter (`Snowflake | Mention`)")
    db.ref(`warns/${msg.guild.id}/${idify(args[1])}`).set({moderator:msg.author, reason: args[2] ? args[2] : "No reason provided."});
    msg.reply(`Successfully warned **${(await bot.users.fetch(idify(args[1]))).tag}** for \`${(await db.ref(`warns/${msg.guild.id}/${idify(args[1])}/reason`).get()).val()}\`.`)
  }
}
