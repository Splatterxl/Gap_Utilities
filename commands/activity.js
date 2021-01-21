const Discord = require('discord.js'),
  Flags = require('../misc/flags.js'),
  paginate = require('../misc/paginate');

module.exports = {
  /**
   * 
   * @param {Discord.Client} bot 
   * @param {Discord.Message} msg 
   * @param {string[]} args 
   * @param {*} db 
   * @param {Flags} flags 
   * @param {CTX} ctx 
   */
  run: async (bot, msg, args, db, flags, ctx) =>
  {
    const target = ctx.flags.getObj().solo?.includes("fetch")
      ? await ctx.client.users.fetch(ctx.util.idify(args[1]))
      : ctx.client.users.cache.find((u) =>
        u.id == ctx.util.idify(args[1]) || args[1]
          ? u.username
            .toLowerCase()
            .includes(ctx.args.slice(1).join(" ")?.toLowerCase())
          : false || u.id == msg.author.id
      ) || ctx.message.author;

    paginate(
      target?.presence.activities?.map(
        (v, i, a) =>
          new Discord.MessageEmbed({
            description: `**${[
              ...(v.type == "LISTENING"
                ? "LISTENING TO"
                : v.type == "COMPETING"
                  ? "COMPETING IN"
                  : v.type),
            ]
              .map((v, i) => (i == 0 ? v.toUpperCase() : v.toLowerCase()))
              .join("")
              .replace(/_/g, " ")}** ${v.type == "CUSTOM_STATUS" ? "" : v.name + " "
              }`.replace(/ +- +/g, "\n"),
            color: "YELLOW",
            title: `${target?.tag}'s Presence`,
            footer: { text: `Page ${i + 1} of ${a.length}` },
            image: {
              url: v.emoji
                ? `https://cdn.discordapp.com/emojis/${v.emoji.id}.png?v=1`
                : v.assets
                  ? v.assets.largeImageURL()
                  : "",
            },
            fields: [
              { name: "Details", value: v.details ?? "None" },
              { name: "State", value: v.state ?? "None" },
              {
                name: "Time elapsed",
                value: require("moment")(v.createdTimestamp)
                  .fromNow()
                  .replace(/ ago/g, ""),
              },
              { name: "Application ID", value: v.applicationID ?? "None" },
              
            ],
            thumbnail: { url: v.assets?.smallImageURL() },
          })
      ) || ["This user has no activities."],
      ctx,
      { respond: false, default: "The user has no activities." });
  },
  help: {
    name: ">activity",
    id: "activity",
    aliases: ["act"],
    desc: "Get activìty info about you or another user!",
    example: ">activity",
    whitelisted: false,
    nsfw: false,
  },
};
