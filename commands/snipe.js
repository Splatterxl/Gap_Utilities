// @ts-nocheck
const Discord = require("discord.js");
let embeds = require("../misc/embeds");
const firebase = require("firebase");

module.exports = {
  help: {
    name: ">snipe",
    id: "snipe",
    aliases: ["snipe", "editsnipe"],
    desc: "Snipe deleted, purged and/or edited messages!",
    example: ">editsnipe",
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   * @param {firebase.default.database.Database} db
   */
  run: async (bot, msg, args, db) => {
    let snipe = global.snipes.get(msg.channel.id);
    msg.reply(
      snipe
        ? new Discord.MessageEmbed({
            color: "YELLOW",
            description: `${
              snipe.editedTimestamp ? "Edit s" : snipe.size ? "Purge s" : "S"
            }nipe by ${snipe.author.tag} (${snipe.author.id})`,
            fields: [
              snipe.size
                ? { name: "Amount Deleted", value: snipe.size.toString() }
                : {
                    name: `${snipe.editedAt ? "New " : ""}Content`,
                    value: snipe.content
                      ? snipe.content.slice(0, 1023)
                      : snipe.embeds
                      ? `${snipe.embeds[0].title}\n${
                          snipe.embeds[0].description
                        }\n${snipe.embeds[0]?.fields
                          .map((v) => `**${v.name}**\n${v.value}`)
                          .join("\n")}\n${snipe.embeds[0]?.footer?.text}`
                          .replace(/((null\n)|(undefined\n))/g, "")
                          .trim()
                          .replace(/ +/g, " ")
                      : snipe.attachments
                      ? `[Attachment](${snipe.attachments.first()?.url})`
                      : "No content?",
                  },
              snipe.size
                ? {
                    name: "Messages Deleted",
                    value: snipe
                      .array()
                      .slice(0, 5)
                      .map(
                        (v) =>
                          `**${v.author.tag}** - \`${(v.content.slice(0, 50) +
                          v.content.slice(50)
                            ? "..."
                            : ""
                          ).replace(/`/g, "\\`")}\``
                      )
                      .join("\n"),
                  }
                : {
                    name: "Author",
                    value: snipe.author.tag,
                  },
            ],
            image: snipe.attachments.size
              ? { url: snipe.attachments.first().url }
              : undefined,
          })
        : `None yet! ${
            global.snipes.size === 0
              ? "Attached `MESSAGE_DELETE`, `MESSAGE_BULK_DELETE` and `MESSAGE_UPDATE` listeners."
              : ""
          }`
    );
    if (global.snipes.size === 0) {
      bot.on("messageUpdate", async (o, n) =>
        {
          if (o.content !== n.content && n.content) global.snipes.set(o.channel.id, await o.channel.messages.fetch(n.id));
        }
      );
      bot.on("messageDelete", (m) => global.snipes.set(m.channel.id, m));
      bot.on("messageBulkDelete", (msgs) =>
        global.snipes.set(msgs.first().channel.id, msgs)
      );
      global.snipes.set("e", true)
    }
  },
};
