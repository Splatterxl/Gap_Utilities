const Discord = require("discord.js");
const idify = require("../misc/idify");
let embeds = require("../misc/embeds");

module.exports = {
  help: {
    name: ">role",
    id: "role",
    aliases: ["roles"],
    desc: "Modifies the roles of a member.",
    example: ">role add 7o70232718339604522 Member",
    category: "moderation",
    whitelisted: false,
    permLvl: 4,
    requiredPerms: ["MANAGE_ROLES"],
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   * @param {firebase.default.database.Database} db
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    args = ctx.args;
    let name;
    let usr;
    switch (args[1]) {
      case "a":
      case "add":
        
    if (!(await ctx.util.get.member(ctx, args[2])).manageable)
      return ctx.respond(
        ctx.util.embeds.errorEmbed("I can't modify the roles of that user!")
      );
        name = ctx.guild.roles.cache.find(
          (v) =>
            v.name.toLowerCase() == args.slice(3).join(" ").toLowerCase() ||
            v.name.startsWith(args.slice(3).join(" ").toLowerCase())
        )?.name;
        ctx.util.get
          .member(ctx, args[2])
          .then(async (v) =>
            v?.roles.add(
              (await v.guild.roles
                .fetch(args[3])
                .catch((e) => null)
                .then((v) => {
                  name = v.name;
                  return v;
                })?.id) ??
                v.guild.roles.cache.find(
                  (v) =>
                    v.name.toLowerCase() ==
                      args.slice(3).join(" ").toLowerCase() ||
                    v.name.startsWith(args.slice(3).join(" ").toLowerCase())
                ).id
            )
          )
          .then((v) => {
            usr = v.user.tag;
            ctx.channel.send(
              ctx.util.embeds.okEmbed(
                `Updated **${usr}**: \`\`\`diff\n+ ${name}\n\`\`\``
              )
            );
          });
        break;
      case "r":
      case "rm":
      case "remove":
        
    if (!(await ctx.util.get.member(ctx, args[2])).manageable)
      return ctx.respond(
        ctx.util.embeds.errorEmbed("I can't modify the roles of that user!")
      );
        name = ctx.guild.roles.cache.find(
          (v) =>
            v.name.toLowerCase() == args.slice(3).join(" ").toLowerCase() ||
            v.name.startsWith(args.slice(3).join(" ").toLowerCase())
        )?.name;
        ctx.util.get
          .member(ctx, args[2])
          .then(async (v) =>
            v?.roles.remove(
              (await v.guild.roles
                .fetch(args[3])
                .catch((e) => null)
                .then((v) => {
                  name = v.name;
                  return v;
                })?.id) ??
                v.guild.roles.cache.find(
                  (v) =>
                    v.name.toLowerCase() ==
                      args.slice(3).join(" ").toLowerCase() ||
                    v.name.startsWith(args.slice(3).join(" ").toLowerCase()) ||
                    v.id == args[3]
                )?.id
            )
          )
          .then((v) => {
            usr = v.user.tag;
            ctx.channel.send(
              ctx.util.embeds.okEmbed(
                `Updated **${usr}**: \`\`\`diff\n- ${name}\n\`\`\``
              )
            );
          });
        break;
      case "list":
        ctx.util.get.member(ctx, args[2]).then(async (v) => {
          ctx.respond(
            
              ctx.util.embeds.neutralEmbed(`**${v.user?.tag}**'s roles:\n\n` +
                v.roles.cache.map((v) => v.toString()).join(", "),
                false
              )
          );
        });
    }
  },
};
