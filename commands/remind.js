const Discord = require("discord.js"),
  Flags = require("../misc/flags.js"),
  paginate = require("../misc/paginate"),
  ms = require("ms"),
  moment = require("moment");
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
  run: async (bot, msg, args, db, flags, ctx) => {
    switch (args[1]) {
      case "list":
        return ctx.respond(
          ctx.util.embeds.neutralEmbed(
            db
              .get(`reminders.${msg.author.id}`)
              ?.map?.((v) => `${moment(v.time).fromNow()} - ${v.content}`)
              .join("\n") || "None",
            false
          )
        );
      default:
        if (!args[2])
          return ctx.respond(
            ctx.util.embeds.errorEmbed(
              "Incorrect arguments! An argument for `reminder` was not provided."
            )
          );
        const data = db.get(`reminders.${msg.author.id}`) ?? [],
          index =
            data.push({
              author: msg.author.id,
              link: `https://canary.discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`,
              channel: msg.channel.id,
              content: args.slice(2).join(" "),
              created: Date.now(),
              time:
                Date.now() +
                (() => {
                  let num = 0;
                  args[1]
                    .match(/\d+[mshyd ]+/g)
                    .map((v) => require("ms")(v))
                    .filter((v) => !!v)
                    .forEach((v) => (num += v));
                  return num;
                })(),
            }) - 1,
          V = data[index],
          K = index;
        db.set(`reminders.${msg.author.id}`, data);
        ctx.respond(
          ctx.util.embeds.okEmbed(
            `I will remind you ${[...ctx.util.unixConvert(V.time)]
              .map((v, i) => (i == 0 ? v.toLowerCase() : v))
              .join("")} (${moment(V.time).fromNow()})!`
          )
        );

        setTimeout(
          () =>
            bot.channels
              .fetch(V.channel)
              .then((channel) =>
                channel
                  .send(
                    `<@${V.author}>, ${moment(V.created).fromNow()}. \n${
                      V.content
                    }\n\n${V.link}`
                  )
                  .then(() => db.delete(`reminders.${msg.author.id}.${index}`))
              ),
          V.time - Date.now()
        );
        break;
    }
  },
  help: {
    name: ">remind",
    id: "remind",
    aliases: ["remindme"],
    desc: "Reminds you to do something!",
    example: ">remind 12h vote",
    whitelisted: false,
    nsfw: false,
  },
};
