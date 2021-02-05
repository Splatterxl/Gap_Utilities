const Discord = require("discord.js");

module.exports = {
  help: {
    name: ">nicklettergiveaway",
    id: "nicklettergiveaway",
    aliases: [],
    desc: "Gives away random letters from your nickname!",
    usage: ">nicklettergiveaway",
    category: "fun",
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    if (
      !ctx.message.guild.me.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_NICKNAMES
      )
    )
      return ctx.respond(ctx.util.embeds.permissionsMissing("manage_nicknames"));
    if (!ctx.message.member.manageable)
      return ctx.respond(
        ctx.util.embeds.errorEmbed("I can't change your nickname!")
      );
    
        const m = await ctx.channel
          .send(`**${ctx.message.author.tag}** is giving away nickname letters!

React to receive a letter!`);
        await m.react("✅");
        const collector = m.createReactionCollector(
          (r, u) => { if (r.emoji.name == "✅" && u.id !== ctx.message.author.id) return true; else { r.users.remove(u.id).catch(() => {}); return false; } },
          { time: 60000 }
        );
        collector.on("collect", async (reaction, user) => {
          if (!(await ctx.guild.members.fetch(user.id)).manageable)
            return reaction.message.channel.send(
              ctx.util.embeds.errorEmbed("I can't change your nickname!")
            );
          let currentNick = {
              author: (await ctx.guild.members.fetch(ctx.message.author.id))
                .displayName,
              user: (await ctx.guild.members.fetch(user.id)).displayName,
            },
            index = Math.floor(Math.random() * currentNick.author.length),
            letter = currentNick.author[index];
          ctx.message.member.setNickname(
            [...currentNick.author].filter((v, i) => i !== index).join("")
          );
          (await ctx.guild.members.fetch(user.id)).setNickname(
            currentNick.user + letter
          );
        });
     
  },
};
