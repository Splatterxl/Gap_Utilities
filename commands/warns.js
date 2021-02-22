const idify = require("../misc/idify"), embeds = require("../misc/embeds"), Discord = require("discord.js");

module.exports = {
  run: async (bot, msg, args, db, flags, ctx) =>
  {
    try
    {
      // if ((!msg.member.permissions.has("BAN_MEMBERS") || !msg.member.permissions.has("KICK_MEMBERS")) && !(require("../whitelist.js").includes(msg.author.id)) && args[1]) return msg.reply(embeds.userPermissionsMissing("bot:(ban&&kick)_members"));
      let warns = [];
      let dbInf = db.get(`warns.g${msg.guild.id}.${args[1] ? idify(args[1]) : msg.author.id}`);
      if (!dbInf) return msg.reply("That user has no warns OwO");
      for (let warn of Object.keys(dbInf))
      {
        warns.push(dbInf[warn]);
      };
      warns = warns.map((v, i, a) => `${Object.keys(dbInf)[i]} - Warning: ${v.reason} (${bot.users.cache.get(v.moderator)?.tag})\n` ).join("");
      ctx.respond(new Discord.MessageEmbed({
        title: `${args[1] ? bot.users.cache.get(idify(args[1])).tag : msg.author.tag}'s Warnings`,
        description: warns,
        color: "ORANGE",
        thumbnail: { url: args[1] ? bot.users.cache.get(idify(args[1])).avatarURL({ dynamic: true }) : msg.author.avatarURL({ dynamic: true }) }
      }));
    } catch (e) { msg.reply(embeds.rejected(e)); }
  },
  help: {
   id: "warns",
   name: ">warns",
   aliases: [ "bonks", "infractions", "cases" ],
   desc: "Shows you or another member's cases",
   example: ">warns",
   whitelisted: false,
   permLvl: 2
 }

};
