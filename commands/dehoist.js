const Discord = require("discord.js");

module.exports.run = async (a, b, args, d, e, ctx) => {
  const err = ([errs, s]) =>
    ctx.respond(`Dehoisted ${s.length} members, failed ${errs.length}.`)    
  if (ctx.args[1]?.toLowerCase?.() === "all")
    return dehoistAll(ctx.guild.members.cache.map((v) => v.user.id))
      .then((s) => ctx.respond(`Dehoisted ${s.length} members.`))
      .catch(err);
  dehoistAll(
    ctx.args.slice(1).length ? ctx.args.slice(1) : [ctx.message.author.id]
  )
    .then((v) =>
      ctx.respond(v.map(`Dehoisted \`${v[0]}\` to \`${v[1]}\``).join("\n"))
    )
    .catch(function (a) {
      return ctx.respond(
        `Couldn't dehoist ${a[0].map(([name]) => `\`${name}\``).join(", ")}`
      )}
    );
  async function dehoistAll(v) {
    let successes = [],
      errs = [];
    v.forEach((v) =>
      ctx.util.get.member(ctx, v).then((v) => {
        let name = v.displayName;
        v.setNickname?.(
          v.displayName
            .replace(
              /(^[!.?,\-\/:;()€&@”[\]{}£\#%\^\*\+=•¥’!\$\?\s`˞˞]+|(^[\S.]$))/g,
              ""
            )
            .trim()
            .replace(/\s+/g, " ")
        )
          .then((m) =>
            // ctx.channel.send(`Dehoisted \`${name}\` to \`${m.displayName}\`.`)
            successes.push([name, m.displayName])
          )
          .catch((e) => errs.push([name, e]));
      })
    );
    if (errs.length) throw [errs, successes];
    return successes;
  }
};
module.exports.help = {
  name: ">dehoist",
  id: "dehoist",
  aliases: ["deh"],
  desc: "Dehoists a member.",
  category: "moderation",
  whitelisted: false,
  usage: ">dehoist <member>",
  permLvl: 2,
  requiredPerms: [
    /*"MANAGE_NICKNAMES"*/
  ],
};
