const Discord = require(`discord.js`),
  // const { global } = require('node/globals.global');
  embeds = require('../misc/embeds'),
  chalk = require('chalk'),
  err = require('../misc/errorHandler.js');

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
      msg.channel.type === 'dm' ||
      cmds == undefined
    )
      return;

    if (!db.get(`settings.g${msg.guild.id}.prefixes`)) {
      db.set(`settings.g${msg.guild.id}`, settings.settings.default);
    }

    if (msg.member === null) return;
    if (
      msg.member.displayName.startsWith('[AFK]') ||
      db.get(`afk.${msg.author.id}`)
    ) {
      // msg.member.setNickname(msg.member.displayName.startWith('[AFK]') ? msg.member.displayName.slice(6) : msg.member.displayName).catch(e => null);
      msg.channel.send(embeds.afkRemove(msg));
      db.delete(`afk.${msg.author.id}`);
    }

    require('../misc/pinged').run(bot, msg, db);
    let flags = require('../misc/flags');
    flags = new flags(msg.content);

    let ctx = {
      client: bot,
      message: msg,
      db,
      whitelist: require('../whitelist.js'),
      util: require('../misc/misc.js'),
      channel: msg.channel,
      guild: msg.guild,
      async respond(content, options) {
        let message = this.client.responses.get(this.message.id);
        if (flags.includes('noembed')) {
          function unixConvert(timestamp) {
            const time = new Date(timestamp);
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            let date = time.getDate(),
              hour = time.getHours(),
              min = time.getMinutes();
            hour < 10 ? (hour = `0${hour}`) : null;
            min < 10 ? (min = `0${min}`) : null;
            date == new Date().getDate() ? (date = 'Today') : (date = date);
            date == new Date(Date.now() + 1 * 1000 * 60 * 60 * 24).getDate()
              ? (date = 'Tomorrow')
              : (date = date);
            date == new Date(Date.now() - 1 * 1000 * 60 * 60 * 24).getDate()
              ? (date = 'Today')
              : (date = date);
            if (timestamp > Date.now() + 1 * 5 * 1000 * 60 * 60 * 24)
              return 'The future';

            return date == 'Today'
              ? `${date} at ${hour}:${min} ${require('moment')(
                  timestamp
                ).format('A')}`
              : date == 'Tomorrow'
              ? `${date} at ${hour}:${min} ${require('moment')(
                  timestamp
                ).format('A')}`
              : `${date}/${month}/${year}`;
          }
          content =
            content instanceof Discord.MessageEmbed
              ? `${content.title ? `**${content.title}**\n` : ''}${
                  content.description ? `${content.description}\n` : ''
                }${
                  content.fields
                    ? `${content.fields.map(
                        (v) => `**${v.name}**\n${v.value}\n`
                      ).join("")}\n`
                    : ''
                }${content.footer ? `${content.footer.text ?? ''}` : ''}${
                  content.timestamp
                    ? content.footer?.text
                      ? ` • ${unixConvert(content.timestamp)}`
                      : content.timestamp
                    : ''
                }`
                  .replace(/<@[^\d>]?\d+>/g, 'Mention')
                  .replace(/\[[^\]]+\]\([^\)]+\)/g, 'Hyperlink')
                  .replace(/[^\<]?https?\:\/\/(((www)|(\w{1,16}))\.)?(\w{1,32})?\.\w{3}(\/[\/\S]+)?[^\>]?/g, v => `<${v.trim()}>`)
              : content;
        }
        const channel = !this.flags.includes('dm')
          ? this.client.channels.resolve(options?.channel) ?? this.channel
          : this.message.author;
        if (message) {
          let embed = content instanceof Discord.MessageEmbed || options?.embed;
          if (flags.includes('noembed')) embed = embed ? false : embed;
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
              `${e}` == 'DiscordAPIError: Cannot send messages to this user' &&
              flags.includes('dm')
            )
              this.message.channel.send(
                new Discord.MessageEmbed({
                  color: 'RED',
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
      blacklist: settings.blacklist,
      get isOwner() {
        return this.message.author.id == '728342296696979526';
      },
    };
    async function parseCmd(content, length, prefix) {
      if (msg.author.bot) return;
      if (v == "none") {
        let args = content.replace(flags._regexp, "").trim().split(/ +/);
        ctx.args = args;
        ctx.unfiltered_args = content.split(/ +/)
      } else { 
        let args = content.slice(length).replace(flags._regexp, "").trim().split(/ +/);
        ctx.args = args;
        ctx.unfiltered = content.slice(length).trim().split(/ +/)
      }
        // try
        // {
        if (
          global.settings.blacklist.includes(msg.author.id) &&
          cmds.find(
            (v) => v.help?.aliases?.includes(args[0]) || v.help?.id == args[0]
          )
        )
          return msg.channel.send(embeds.blacklisted());
        // @ts-ignore
        const cmd = cmds.find(
          (v) => v.help?.aliases?.includes(args[0]) || v.help?.id == args[0]
        );
        if (cmd?.nsfw && !msg.channel.nsfw)
          return ctx.respond(
            new Discord.MessageEmbed({
              color: 'RED',
              description:
                '<:redTick:796095862874308678> This command cannot be used in a non-NSFW channel!',
            })
          );
        if (cmd?.help?.requiredPerms) {
          const perms = cmd?.help?.requiredPerms
            ?.map((v) => [
              v,
              msg.guild.me.permissions.has(Discord.Permissions.FLAGS[v]),
            ])
            .filter((v) => v[1] === false)
            .map((v) => v[0]);
          if (!perms) return;
          return msg.channel.send(
            new Discord.MessageEmbed({
              description:
                '<:redTick:796095862874308678' +
                `> I am missing the following required permission${
                  perms.length > 1 ? 's' : ''
                }: ` +
                perms
                  .map((v, i, a) =>
                    i == a.length - 1
                      ? v
                      : i == a.length - 2
                      ? `${v} and `
                      : `${v}, `
                  )
                  .join('')
                  .replace(/[^ ,and]+/g, (v) => `\`${v}\``),
              color: 'RED',
            })
          );
        }
        try {
          await cmd?.run(bot, msg, args, db, flags, ctx);
          if (cmd)
            console.log(
              chalk`{yellow [ ANALYTICS - CMD_USE ]}\n\n{green $name}: ${
                cmd.help?.id
              }\n{green $class}: ${!!cmd.constructor}\n\n{green @name}: ${
                msg.author.tag
              }\n{green @id}: ${msg.author.id}\n\n{green #name}: ${
                msg.channel.name
              }\n{green #id}: ${msg.channel.id}\n\n{green %name}: ${
                msg.guild.name
              }\n{green %id}: ${msg.guild.id}\n{green %owner}: ${
                msg.guild.ownerID
              }\n{green %memberCount}: ${msg.guild.memberCount}`
            );
        } catch (e) {
          msg.channel.send(err.find(e));
        }
      }
    };
    // parseCmd(args);
    /* parseCmd(
      msg.content
        .slice(
          0,
          msg.content.length -
            (bot.user.id == '784833064400191509'
              ? 'eb;'.length
              : db.`settings${msg.guild.id}/prefix`)
                  .length)
        )
        .trim()
        .split(/ +/)
        .reverse()
        .map(v => [...v].reverse().join('')),
      { type: 'end' }
    ); */
    (bot.user.id != "784833064400191509" ? [ db.get(`settings.g${msg.guild.id}.prefixes`), db.get(`settings.u${msg.author.id}.prefixes`), [ `${bot.user}` ] ] : [ [ "eb;" ] ]).forEach(v => v?.map(v => msg.content.startsWith(v) ? parseCmd(msg.content, v.length, v) : null))
    if (msg.author.discriminator === '0000') return;
    // @ts-ignore
    if (require('os').platform == 'linux') return;
    //} catch (e) {
    //    console.log(chalk`{red ERROR!} ${e}`);
    //    }
  },
};
