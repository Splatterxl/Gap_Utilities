const idify = require("../misc/idify"), embeds = require("../misc/embeds"), Discord = require("discord.js");

module.exports = {
  run: async (bot, msg, args, db) =>
  {
    try
    {
      if ((!msg.member.permissions.has("BAN_MEMBERS") || !msg.member.permissions.has("KICK_MEMBERS")) && !(require("../whitelist.js").includes(msg.author.id)) && args[1]) return msg.reply(embeds.userPermissionsMissing("bot:(ban&&kick)_members"));
      let warns = [];
      let dbInf = db.get(`warns.${msg.guild.id}.${args[1] ? idify(args[1]) : msg.author.id}`);
      if (!dbInf) return msg.reply("That user has no warns OwO");
      for (let warn of Object.keys(dbInf))
      {
        warns.push(dbInf[warn]);
      };
      warns.forEach((v, i, a) => { a[i] = { name: Object.keys(dbInf)[i], value: `Moderator: <@${v.moderator.id}>\nReason: ${v.reason}` }; });
      msg.reply(new Discord.MessageEmbed({
        title: `${args[1] ? bot.users.cache.get(idify(args[1])).tag : msg.author.tag}'s Warnings`,
        fields: warns,
        color: "ORANGE",
        thumbnail: { url: args[1] ? bot.users.cache.get(idify(args[1])).avatarURL() : msg.author.avatarURL() }
      }));
    } catch (e) { msg.reply(embeds.rejected(e)); }
  }
};
