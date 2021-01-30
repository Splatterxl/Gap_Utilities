const Discord = require("discord.js"),
  idify = require("../misc/idify"),
  { Permissions } = Discord;

module.exports = {
  help: {
    name: ">perms",
    id: "perms",
    aliases: ["perms", "permissions"],
    desc: "Displays the permissions the bot has.",
    example: ">perms",
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags, ctx) => {
    const member = ctx.util.get.member(ctx, args.slice(1).join(" "));
    if (!member) return ctx.respond(ctx.util.embeds.errorEmbed("I couldn't find that member!"))
    const _ = new Discord.MessageEmbed({
      color: "YELLOW",
      title: `${member.user.tag}'s Permissions`,
      description: new Permissions(Permissions.ALL)
        .toArray()
        .map((perm) => `\`${perm.replace(/_/g, "").replace(/\b\w/g, v => v.toUpperCase())}\` | ${member.permissions.has(perm) ? '<:greenTick:796095828094615602>' : "<:redTick:796095862874308678>"}`)
        .join("\n"),
    });
    msg.channel.send(_);
  },
};
