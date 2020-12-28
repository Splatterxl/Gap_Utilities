const embeds = require("../assets/embeds"),
  idify = require("../assets/idify");

module.exports = {
  run: async (bot, msg, args, db) => {
    if (!(msg.member.permissions.has("BAN_MEMBERS") && msg.member.permissions.has("KICK_MEMBERS"))) if (msg.author.tag == "Splatterxl#8999") {} else return msg.reply(embeds.userPermissionMissing("perm:(kick&&ban)_members"));
    if (!args[1]) return msg.reply("Incorrect usage: should have at least one parameter (`Snowflake | Mention`)");
    let index = 0;
    if (!(await db.ref(`warns/${msg.guild.id}`).get()).val()) db.ref(`warns/${msg.guild.id}`).set({idify(args[1]):["--start--"]});
    db.ref(`warns/${msg.guild.id}/${idify(args[1])}`).set((async()=>{let warns = (await db.ref(`warns/${msg.guild.id}/${idify(args[1])}`).get()).val(); warns = warns ? warns : [];index = warns.push({moderator:msg.author, reason: args[2] ? args.slice(2).join(" ") : "No reason provided."}); return warns;})());
    msg.reply(`Successfully warned **${(await bot.users.fetch(idify(args[1]))).tag}** for \`${(await db.ref(`warns/${msg.guild.id}/${idify(args[1])}`).get()).val()[index]}\`.`)
  }
}
