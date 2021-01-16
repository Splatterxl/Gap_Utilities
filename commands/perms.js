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
  run: async (bot, msg, args, db, flags) => {
    const member = flags.getObj().solo?.includes("fetch")
      ? await msg.guild.members.fetch(idify(args[1])).catch((e) => null)
      : msg.guild.members.cache.find((u) =>
          u.user.id == idify(args[1]) || args[1]
            ? u.user.username
                .toLowerCase()
                .includes(args.slice(1).join(" ").toLowerCase())
            : false || u.user.id == msg.author.id
        );
    const _ = new Discord.MessageEmbed({
      title: `${member.user.tag}'s Permissions`,
      description: new Permissions(Permissions.ALL)
        .toArray()
        .map((perm) => `**${perm}**: \`${member.permissions.has(perm)}\``)
        .join("\n"),
    });
    msg.channel.send(_);
  },
};
