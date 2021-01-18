const Discord = require("discord.js");
const idify = require("../misc/idify");
const err = require("../misc/errorHandler"),
  moment = require("moment"),
  depression = require("../misc/depression"),
  { SnowflakeUtil } = Discord,
  proc = require("child_process");

module.exports = {
  help: {
    name: ">whois",
    id: "whois",
    whitelisted: false,
    aliases: ["ui", "userinfo", "profile"],
    desc: "Gets a profile on a user.",
    example: ">whois 13802482938501",
    category: "utility",
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args, db, flags) => {
    try {
      let member = flags.getObj().solo?.includes("fetch")
          ? await msg.guild.members.fetch(idify(args[1])).catch((e) => null)
          : msg.guild.members.cache.find((u) =>
              u.user.id == idify(args[1]) || args[1]
                ? u.user.username
                    .toLowerCase()
                    .includes(args.slice(1).join(" ").toLowerCase())
                : false || args[1]
                ? u.displayName?.toLowerCase()
                    .includes(args.slice(1).join(" ").toLowerCase())
                : false || u.user.id == msg.author.id
            ),
        user = member
          ? member.user
          : flags.getObj().solo?.includes("fetch")
          ? await bot.users.fetch(idify(args[1]))
          : bot.users.cache.find((u) =>
              u.id == idify(args[1]) || args[1]
                ? u.username
                    .toLowerCase()
                    .includes(args.slice(1).join(" ")?.toLowerCase())
                : false || u.id == msg.author.id
            );
      member ??= user.id == msg.author.id ? msg.member : null;
      if (!user) {
        user = msg.author;
        member = msg.member
      }
      const flagArray = user.flags
        ? [
            user.flags.has(Discord.UserFlags.FLAGS.DISCORD_EMPLOYEE)
              ? "<:stafftools:799349935224258600>"
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.EARLY_SUPPORTER)
              ? "<:supporter:799348812803342407>"
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.EARLY_VERIFIED_BOT_DEVELOPER)
              ? "<:early_verified_dev:799325612669009990>"
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.PARTNERED_SERVER_OWNER)
              ? "<:discord_partner:799348216431771720>"
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BALANCE)
              ? "<:hype_balance:799318532407689244>"
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRAVERY)
              ? "<:hype_brave:799318595782967307>"
              : undefined,
            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRILLIANCE)
              ? "<:hype_brill:799325528960139294>"
              : undefined,
            proc
              .execSync(
                `curl -I ${user
                  .avatarURL()
                  .replace(/\.webp/g, ".gif")} | grep HTTP`
              )
              .toString() == "HTTP/2 200"
              ? "Nitro"
              : undefined,
          ]
        : "None";
      let _ = new Discord.MessageEmbed({
        color: "YELLOW",
        title: "User Statistics",
        description: `These are all the user statistics I could find for ${user.tag} (${user.id})`,
        fields: [
          {
            name: "User Tag",
            value: user?.tag || "None",
            inline: true,
          },
          {
            name: "Nickname",
            value: member?.displayName || "None",
            inline: true,
            guildSpecific: true,
          },
          {
            name: "ID Breakdown",
            value:
              user?.id ? Object.keys(SnowflakeUtil.deconstruct(user?.id)).map(
                (v) =>
                  `**${[...v]
                    .map((v, i, a) =>
                      i === 0 || a[i - 1] == "" ? v.toUpperCase() : v
                    )
                    .join("")}**: \`${`${
                    SnowflakeUtil.deconstruct(user.id)[v]
                  }`.replace(/ GMT+\d{4}[\s\S]+/g, "")}\``
              )
               : "None" || "None",
            inline: true,
          },
          {
            name: `Joined [${
              member ? moment(member?.joinedTimestamp).fromNow() : null
            }] at`,
            value:
              `${member?.joinedAt}`.replace(/ GMT+\d{4}[\s\S]+/g, "") || "None",
            inline: true,
            guildSpecific: true,
          },
          {
            name: `Created [${moment(user.createdTimestamp).fromNow()}] at`,
            value:
              `${user?.createdAt}`.replace(/ GMT+\d{4}[\s\S]+/g, "") || "None",
            inline: true,
          },
          {
            name: "Permissions",
            value: member?.permissions.bitfield || "None",
            inline: true,
            guildSpecific: true,
          },
          {
            name: "Account Type",
            value: user?.bot
              ? "Bot"
              : user?.system
              ? "System"
              : "Human" || "None",
            inline: true,
          },
          {
            name: "Status",
            value: user.presence?.clientStatus
              ? Object.keys(user.presence?.clientStatus).map(
                  (v) =>
                    `**${[...v]
                      .map((v, i, a) =>
                        i === 0 || a[i - 1] == "" ? v.toUpperCase() : v
                      )
                      .join("")}**: ${user.presence.clientStatus[v]}`
                )
              : "Offline" || "None",
            inline: true,
          },
          {
            name: "Badges",
            value:
              `${
                user.flags && flagArray.join("").trim()
                  ? flagArray.join("")
                  : "None"
              }` || "None",
            inline: true,
          },
          {
            name: `Roles [${member?.roles.cache.size - 1}; up to 6 are shown]`,
            value:
              member?.roles.cache
                .map((v) => v.toString())
                .filter((v) => v !== "@everyone")
                .slice(0, 6)
                .join(", ") || "None",
            inline: true,
            guildSpecific: true,
          },
        ]
          .filter((v) => (member ? true : !v.guildSpecific))
          .filter((v) => v.name && v.value)
          .map(v => { console.log(v.value); return v; }),
        thumbnail: {
          url: user.avatarURL(),
        },
      });
      depression(await msg.channel.send(_), msg);
    } catch (e) {
      msg.reply(err.find(`${e}`));
    }
  },
};
