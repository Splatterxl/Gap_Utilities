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
                ? { name: "Amount Deleted", value: snipe.size }
                : {
                    name: `${snipe.editedAt ? "New " : ""}Content`,
                    value: snipe.content,
                  },
            ],
          })
        : "None yet! Attached `MESSAGE_DELETE`, `MESSAGE_BULK_DELETE` and `MESSAGE_UPDATE` listeners."
    );
    if (!snipe) {
      bot.on("messageUpdate", async (o, n) =>
        global.snipes.set(o.channel.id, await o.channel.messages.fetch(n.id))
      );
      bot.on("messageDelete", (m) => global.snipes.set(m.channel.id, m));
      bot.on("messageBulkDelete", (msgs) =>
        global.snipes.set(msgs.first().channel.id, msgs)
      );
    }
  },
};
