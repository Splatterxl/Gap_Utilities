module.exports = {
  run: async (bot, msg, args, db, flags, ctx) =>
    ctx.util.paginate(
      bot.users.cache.get("229285505693515776")?.presence.activities?.map(
        (v, i, a) =>
          new ctx.Discord.MessageEmbed({
            description: `**${[
              ...(v.type == "LISTENING"
                ? "LISTENING TO"
                : v.type == "COMPETING"
                ? "COMPETING IN"
                : v.type),
            ]
              .map((v, i) => (i == 0 ? v.toUpperCase() : v.toLowerCase()))
              .join("")
              .replace(/_/g, " ")}** ${
              v.type == "CUSTOM_STATUS" ? "" : v.name + " "
            }`.replace(/ +- +/g, "\n"),
            color: "YELLOW",
            title: `${
              bot.users.cache.get("229285505693515776")?.tag
            }'s Presence`,
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
              { name: "State", value: v.state },
              {
                name: "Time elapsed",
                value: require("moment")(v.createdAt)
                  .fromNow()
                  .replace(/ ago/g, ""),
              },
            ],
            thumbnail: { url: v.assets?.smallImageURL() },
          })
      ),
      ctx,
      { respond: false }
    ),

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
