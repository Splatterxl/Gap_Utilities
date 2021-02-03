const idify = require("../misc/idify"), embeds = require("../misc/embeds"), Discord = require("discord.js");

module.exports = {
  run: async (bot, msg, args, db, flags, ctx) =>
  {
    // try
    // {
      if ((!msg.member.permissions.has("BAN_MEMBERS") || !msg.member.permissions.has("KICK_MEMBERS")) && !(require("../whitelist.js").includes(msg.author.id))) return msg.reply(embeds.userPermissionsMissing("warn_members"));
      if (!args[2]) return ctx.respond(ctx.util.embeds.errorEmbed("This command requires at least two arguments. (`Snowflake | Mention` & `string`)"))
      let dbInf = db.get(`warns.g${msg.guild.id}.${idify(args[1])}.${args[2]}`);
      if (!dbInf) return ctx.respond(ctx.util.embeds.errorEmbed(`No such warning (\`${args[2]}\`) exists for that user!`))
      db.delete(`warns.g${msg.guild.id}.${idify(args[1])}.${args[2]}`)
      ctx.respond(ctx.util.embeds.okEmbed(`Successfully deleted warning \`${args[2]}\``));
    // } catch (e) { msg.reply(embeds.rejected(e)); }
  },
  help: {
   id: "clearcase",
   name: ">clearcase",
   aliases: [ "clearwarn", "clearinfraction", "clearbonk" ],
   desc: "Clears a member's case(s)",
   example: ">clearcase <member> <case>",
   whitelisted: false
 }

};
