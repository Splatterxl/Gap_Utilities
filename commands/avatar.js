module.exports.help = {
  name: ">avatar",
  id: "avatar", 
  aliases: [ "av" ],
  desc: "Get an image of a user's avatar!",
  category: "utility",
  whitelisted: false,
  example: ">avatar @Splatterxl#8999"
};

module.exports.run = async (a,b,c,d,e,ctx) => {
const target = ctx.args[1] ? await ctx.util.get.user(ctx, ctx.args.slice(1).join(" ")) : ctx.message.author;
if (target === null) return;
target ??= ctx.message.author
ctx.respond(new ctx.Discord.MessageEmbed({
  title: `${target.tag}'s Avatar`,
  image: { url: target.avatarURL({ dynamic: true, format: "jpg" }) },
  color: "YELLOW",
  footer: { text: `Requested by ${ctx.message.author.tag} (${ctx.message.author.id})` }
}))

}
