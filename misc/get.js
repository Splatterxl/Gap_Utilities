const assert = (data, target) => data.toLowerCase() == target || data.toLowerCase().startsWith(target) || data.toLowerCase().includes(target),
  disc = async (ctx, target, type = "user") => {
    const members = ctx.guild.members.cache.filter(v => v.user.discriminator == target.slice(1, 5));
    if (!members?.first()) return ctx.message[type == "user" ? "author" : "member"];
    ctx.channel.send(ctx.util.embeds.collectorEmbed(`${members.size} members have the ${target.slice(0, 5)} discriminator. Respond with the index of the one you want.\n\n${`${members.map(v => v).map((v, i) => `${i + 1} | ${v.user.tag} (${v.user.id})`).slice(0, 25).join("\n")}${members.map((v, i) => `${i + 1} | ${v.user.tag} (${v.user.id})`).slice(25).length ? ` and ${members.map((v, i) => `${i + 1} | ${v.user.tag} (${v.user.id})`).slice(25).length} more...` : ""}`}`, "1 minute", true));
    let index;
    try {
      index = (await ctx.channel.awaitMessages((m) => m.author.id == ctx.author.id, { max: 1, time: 60000, errors: ["time"] })).first()
    } catch { 
      ctx.respond(ctx.util.embeds.errorEmbed("You didn't respond in time!"))
      return undefined;
    }
    if (index == "cancel") { ctx.respond(ctx.util.embeds.neutralEmbed("Cancelled.")); return undefined; }
    if (isNaN(parseInt(index))) { ctx.respond(ctx.util.embeds.errorEmbed("Please send a valid number.")); return ctx.message[type == "user" ? "author" : "member"]; }
    index = parseInt(index);
    if (!members.map(v => v)[index - 1]) { ctx.respond(ctx.util.embeds.errorEmbed("That user doesn't exist!")); return undefined; }
    return eval(`members.map(v => v)[index - 1]${type == "user" ? ".user" : ""}`);
  }

module.exports.member = async (ctx, target) => (target.startsWith("#") ? await disc(ctx, target, "member") : (await ctx.guild.members.fetch(target.replace(/[^\d]+/g, ""), true).catch(e => null)) ?? (target.startsWith("^") ? ctx.util.powerof(target.match(/\^/g).length, ctx.message).author : ctx.guild.members.cache.find(v => assert(v.user.id, target.replace(/[^\d]+/g, "")) || assert(v.displayName, target) || assert(v.user.tag, target) || assert(v.user.username, target))));
module.exports.user = async (ctx, target) => (target.startsWith("#") ? await disc(ctx, target, "user") : (await ctx.client.users.fetch(target.replace(/[^\d]+/g, ""), true).catch(e => null)) ?? (target.startsWith("^") ? ctx.util.powerof(target.match(/\^/g).length, ctx.message).author : ctx.client.users.cache.find(v => assert(v.id, target.replace(/[^\d]+/g, "")) || assert(v.tag, target) || assert(v.username, target))));
