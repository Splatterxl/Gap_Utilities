const Discord = require(`discord.js`),
  embeds = require("../misc/embeds"),
  chalk = require("chalk"),
  err = require("../misc/errorHandler.js");

module.exports = {
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message} msg
   * @param {firebase.default.database.Database} db
   */
  run: async (bot, msg, db) => {
    //try {
    if (
      !msg.guild ||
      msg.guild == undefined ||
      msg.channel.type === "dm" ||
      cmds == undefined
    )
      return;

    if (!db.get(`settings.g${msg.guild.id}`)) {
      db.set(`settings.g${msg.guild.id}`, settings.settings.default);
    } else if (!db.get(`settings.g${msg.guild.id}.prefixes`))
      void db.get(`settings.g${msg.guild.id}.prefixes`, [">"]);
    if (msg.member === null) return;
    if (
      msg.member.displayName.startsWith("[AFK]") ||
      db.get(`afk.${msg.author.id}`)
    ) {
      msg.channel.send(embeds.afkRemove(msg));
      db.delete(`afk.${msg.author.id}`);
    }

    require("../misc/pinged").run(bot, msg, db);
    let flags = new (require("../misc/flags"))(msg.content);

    let ctx = {
      client: bot,
      message: msg,
      db,
      author: msg.author,
      whitelist: require("../whitelist.js"),
      util: require("../misc/misc.js"),
      channel: msg.channel,
      guild: msg.guild,
      async respond(content, options) {
        let message = this.client.responses.get(this.message.id);
        if (flags.includes("noembed")) {
          content =
            content instanceof Discord.MessageEmbed
              ? `${content.title ? `**${content.title}**\n` : ""}${
                  content.description ? `${content.description}\n` : ""
                }${
                  content.fields
                    ? `${content.fields
                        .map((v) => `**${v.name}**\n${v.value}\n`)
                        .join("")}\n`
                    : ""
                }${content.footer ? `${content.footer.text ?? ""}` : ""}${
                  content.timestamp
                    ? content.footer?.text
                      ? ` • ${this.util.unixConvert(content.timestamp)}`
                      : this.util.unixConvert(content.timestamp)
                    : ""
                }`
                  .replace(/<@[^\d>]?\d+>/g, "Mention")
                  .replace(/\[[^\]]+\]\([^\)]+\)/g, "Hyperlink")
                  .replace(
                    /[^<]?https?:\/\/(((www)|(\w{1,16}))\.)?(\w{1,32})?\.\w{2,16}(\/[/\S]+)?[^>]?/g,
                    (v) => `<${v.trim()}>`
                  )
              : content;
        }
        const channel = !this.flags.includes("dm")
          ? this.client.channels.resolve(options?.channel) ?? this.channel
          : this.message.author;
        if (message) {
          let embed = content instanceof Discord.MessageEmbed || options?.embed;
          if (flags.includes("noembed")) embed = embed ? false : embed;
          const attachment = message.attachments.size || options?.files?.length;
          if (attachment) {
            await message.delete();
            message = await channel.send(content, options);
            this.client.responses.set(this.id, message);
          } else if (embed) {
            message = await message.edit(content, options);
          } else {
            message = await message.edit(content, {
              embed: null,
              ...options,
            });
          }
        } else {
          message = await await channel.send(content, options).catch((e) => {
            if (
              `${e}` == "DiscordAPIError: Cannot send messages to this user" &&
              flags.includes("dm")
            )
              this.message.channel.send(
                new Discord.MessageEmbed({
                  color: "RED",
                  description:
                    "<:redTick:796095862874308678> I can't send a message to you! Please make sure your DMs are open in at least one of our Mutual Servers!",
                })
              );
            return this.response ?? this.message.channel.send(content, options);
          });
          this.client.responses.set(this.message.id, message);
        }
        bot.responses = this.client.responses;
        this.util.depression(message, this.message, this);
        return message;
      },
      flags,
      cmds,
      get aliases() {
        const aliases = cmds.map((v) => v.help?.aliases).filter((v) => v);
        const collection = new Discord.Collection();
        aliases.forEach((v) =>
          collection.set(
            v,
            cmds.find((cmd) => cmd.help?.aliases?.includes(v))
          )
        );
        return collection;
      },
      Discord,
      blacklist: db.get("blacklist"),
      get isOwner() {
        return this.message.author.id == "728342296696979526";
      },
    };
    async function parseCmd(content, length, prefix) {
      if (msg.author.bot) return;
      if (prefix == "none") {
        let args = content.replace(flags._regexp, "").trim().split(/ +/);
        ctx.args = args;
        ctx.unfiltered_args = content.split(/ +/);
      } else {
        let args = content
          .slice(length)
          .replace(flags._regexp, "")
          .trim()
          .split(/ +/);
        ctx.args = args;
        ctx.unfiltered_args = content.slice(length).trim().split(/ +/);
      }
      // @ts-ignore
      const cmd =
        cmds.get(ctx.args[0]) ??
        cmds.find(
          (v) =>
            v.help?.aliases?.includes(ctx.args[0]) || v.help?.id == ctx.args[0]
        );
      if (!cmd) return;
      console.info(
        `User ${msg.author.tag} (${msg.author.id}) used command "${
          cmd.help?.id ?? "[uncategorized]"
        }" in guild ${msg.guild.name} (${msg.guild.id}) and is${
          Object.keys(ctx.blacklist).includes(ctx.message.author.id)
            ? ""
            : " not"
        } blacklisted. Channel: #${msg.channel.name} (${
          msg.channel.id
        }).\nRaw content of message:\n\n${msg.content}`
      );
      if (
        Object.keys(ctx.blacklist).includes(ctx.message.author.id) &&
        cmd?.help?.id != "bl" &&
        cmd
      )
        return msg.channel.send(
          embeds.blacklisted(ctx.blacklist[ctx.message.author.id])
        );

      if (cmd?.nsfw && !msg.channel.nsfw)
        return ctx.respond(
          new Discord.MessageEmbed({
            color: "RED",
            description:
              "<:redTick:796095862874308678> This command cannot be used in a non-NSFW channel!",
          })
        );
      if (cmd?.help?.requiredPerms && !cmd.permLevel) {
        const perms = cmd?.help?.requiredPerms
          ?.map((v) => [
            v,
            msg.guild.me.permissions.has(Discord.Permissions.FLAGS[v]),
            msg.member.permissions.has(Discord.Permissions.FLAGS[v]) &&
            !ctx.isOwner
              ? false
              : true,
          ])
          .filter((v) => !v[1] || !v[2]);
        if (perms.filter((v) => !v[1]).length)
          return ctx.respond(
            new Discord.MessageEmbed({
              description:
                `<:redTick:796095862874308678> I am missing the following required permission${
                  perms.length > 1 ? "s" : ""
                }: ` +
                perms
                  .map((v, i, a) =>
                    i == a.length - 1
                      ? v[0]
                      : i == a.length - 2
                      ? `${v[0]} and `
                      : `${v[0]}, `
                  )
                  .join("")
                  .replace(/[^ ,and]+/g, (v) => `\`${v}\``),
              color: "RED",
            })
          );
        if (perms.filter((v) => !v[2]).length)
          return ctx.respond(
            new Discord.MessageEmbed({
              description:
                `<:redTick:796095862874308678> You are missing the following required permission${
                  perms.length > 1 ? "s" : ""
                }: ` +
                perms
                  .map((v, i, a) =>
                    i == a.length - 1
                      ? v[0]
                      : i == a.length - 2
                      ? `${v[0]} and `
                      : `${v[0]}, `
                  )
                  .join("")
                  .replace(/[^ ,and]+/g, (v) => `\`${v}\``),
              color: "RED",
            })
          );
      } else if (cmd?.permLevel ?? 1) {
        const permLvls = {
          perms: [
            [],
            ["SEND_MESSAGES"],
            ["KICK_MEMBERS"],
            ["MANAGE_MESSAGES", "BAN_MEMBERS"],
            ["MANAGE_GUILD"],
            ["ADMINISTRATOR"],
          ],
          verbose: [
            0,
            "Member",
            "Helper",
            "Moderator",
            "Manager",
            "Administrator",
          ],
        };
        if (
          !permLvls.perms
            .every((v, i) => i <= (cmd.permLevel ?? 1) && !v.filter(v => msg.member.permissions.has(Discord.Permissions.FLAGS[v])).length)
        )
          return ctx.respond(
            ctx.util.embeds.errorEmbed(
              `You don't have the right permission level for this! Your level: \`${
                permLvls.verbose[
                  permLvls.perms.indexOf(permLvls.perms.find(
                    (v, i) => i <= (cmd.permLevel ?? 1) && !v.every(v => msg.member.permissions.has(Discord.Permissions.FLAGS[v]))
                  ))
                ]
              }\`; Required level: \`${permLvls.verbose[cmd?.permLevel ?? 1]}\``
            )
          );
      }
      if (
        cmd?.help?.voteLocked &&
        !(await require("../misc/vbapi").voted(bot.user.id, msg.author.id))
          .voted
      )
        return msg.channel.send(
          new Discord.MessageEmbed({
            description: `<:redTick:796095862874308678> I couldn't execute this command because you haven't voted on [VoidBots.net](https://voidbots.net/bot/${bot.user.id}/vote "Vote for me here!")! Please note that it may take up to 5 minutes for your vote to register.`,
            color: "RED",
          })
        );
      if (
        (cmd?.help?.whitelisted || cmd?.help?.category == "owner") &&
        !ctx.whitelist.includes(ctx.author.id)
      )
        return ctx.respond(
          new Discord.MessageEmbed({
            color: "RED",
            description:
              "<:redTick:796095862874308678> You need to be whitelisted to use this command!",
          })
        );
      try {
        await cmd?.run(bot, msg, ctx.args, db, flags, ctx);
      } catch (e) {
        msg.channel.send(err.find(e));
      }
    }
    const prefixes =
      bot.user.id != "784833064400191509"
        ? [
            db.get(`settings.g${msg.guild.id}.prefixes`),
            db.get(`settings.u${msg.author.id}.prefixes`),
            [`<@!${bot.user.id}>`, `<@${bot.user.id}>`],
          ]
        : [["eb;"]];
    prefixes.forEach((v) =>
      v?.map((v) =>
        msg.content.startsWith(v) ? parseCmd(msg.content, v.length, v) : null
      )
    );
  },
};
