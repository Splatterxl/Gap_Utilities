// @ts-nocheck
const Discord = require("discord.js");
let embeds = require("../misc/embeds");
const firebase = require("firebase"),
  { EditedMessage } = require("../structures/classes.js")

module.exports = {
  help: {
    name: ">snipe",
    id: "snipe",
    aliases: ["snipe", "editsnipe"],
    desc: "Snipe deleted, purged and/or edited messages!",
    usage: ">editsnipe",
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   * @param {firebase.default.database.Database} db
   */
  run: async (bot, msg, args, db,  flags, ctx) => {
    let snipe = global.snipes.get(msg.channel.id);
    ctx.respond(
      snipe
        ? new Discord.MessageEmbed({
            color: "YELLOW",
            description: `${
              snipe.editedTimestamp ? "Edit s" : snipe.size ? "Purge s" : "S"
            }nipe by ${snipe.author.tag} (${snipe.author.id})`,
            fields: [
                {
                    name: `${snipe.editedAt ? "Old " : ""}Content`,
                    value: snipe.old?.content
                      ? snipe.old?.content.slice(0, 1023)
                      : snipe.content ? snipe.content
                      : snipe.embeds
                      ? `${snipe.embeds[0].title}\n${
                          snipe.embeds[0].description
                        }\n${snipe.embeds[0]?.fields
                          .map((v) => `**${v.name}**\n${v.value}`)
                          .join("\n")}\n${snipe.embeds[0]?.footer?.text}`
                          .replace(/((null(\n)?)|(undefined(\n)?))/g, "")
                          .trim()
                          .replace(/ +/g, " ")
                      : snipe.attachments
                      ? `[Attachment](${snipe.attachments.first()?.url})`
                      : "No content?",
                  },
              snipe.old?.content
                ? {
                    name: "New Content",
                    value: snipe.content,
                  }
                : {
                    name: "Author",
                    value: snipe.author.tag,
                  },
                { name: "Link", value: `[Beam me up!](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${snipe.id})` }
            ],
            image: snipe.attachments.size
              ? { url: snipe.attachments.first().url }
              : undefined,
          })
        : 'None yet!'
    );
    
  },
};
