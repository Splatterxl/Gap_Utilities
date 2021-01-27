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
    if (
      !msg.guild ||
      msg.guild == undefined ||
      msg.channel.type === 'dm' ||
      cmds == undefined
    )
      return;

    if (!(await db.ref(`settings/${msg.guild.id}`).get()).val()) {
      db.ref(`settings/${msg.guild.id}`).set(global.settings.settings.default);
    }

    if (msg.member === null) return;
    if (
      msg.member.displayName.startsWith('[AFK]') ||
      (await db.ref(`afk/${msg.guild.id}/${msg.author.id}`).get()).val()
    ) {
      // msg.member.setNickname(msg.member.displayName.startWith('[AFK]') ? msg.member.displayName.slice(6) : msg.member.displayName).catch(e => null);
      msg.channel.send(embeds.afkRemove(msg));
      db.ref(`afk/${msg.guild.id}/${msg.author.id}`).remove();
    }

    require('../misc/pinged').run(bot, msg, db);
    let flags = require('../misc/flags');
    flags = new flags(msg.content);

    // @ts-ignore
    let args = (flags._obj.filtered ?? msg.content)
      .slice(
        bot.user.id == '784833064400191509'
          ? 'eb;'.length
          : (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val().length
      )
      .trim()
      .split(/ +/);
    let ctx = {
      client: bot,
      message: msg,
      args,
      db,
      whitelist: require('../whitelist.js'),
      util: require('../misc/misc.js'),
      channel: msg.channel,
      guild: msg.guild,
      async respond(content, options) {
        let message = this.client.responses.get(this.message.id);
        const channel = !this.flags.includes('dm')
          ? this.client.channels.resolve(options?.channel) ?? this.channel
          : this.message.author;
        if (message) {
          const embed =
            content instanceof Discord.MessageEmbed || options?.embed;
          const attachment = message.attachments.size || options?.files?.length;
          if (attachment) {
            await message.delete();
            message = await channel.send(content, options);
            this.client.responses.set(this.id, message);
          } else if (embed) {
            message = await message.edit(content, options);
          } else {
            message = await message.edit(content, { embed: null, ...options });
          }
        } else {
          message = await await channel.send(content, options).catch((e) => {
            if (
              `${e}` == 'DiscordAPIError: Cannot send messages to this user' &&
              flags.includes('dm')
            )
              return message.channel.send(
                new Discord.MessageEmbed({
                  color: 'RED',
                  description:
                    "<:redTick:796095862874308678> I can't send a message to you! Please make sure your DMs are open in at least one of our Mutual Servers!",
                })
              );
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
    };
    async function parseCmd(args, opts = { type: 'start' }) {
      if (msg.author.bot) return;
      if (
        (bot.user.id == '784833064400191509' &&
          msg.content.startsWith('eb;')) ||
        (bot.user.id !== '784833064400191509' &&
          (msg.content.startsWith(
            (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()
          ) ||
            msg.author.id === '728342296696979526'))
      ) {
        if (msg.author.id === '728342296696979526')
          args = msg.content.startsWith(
            bot.user.id == '784833064400191509'
              ? 'eb;'
              : (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()
          )
            ? args
            : msg.content.split(/ +/);
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
              description: '<:redTick:796095862874308678> This command cannot be used in a non-NSFW channel!',
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
                cmd.id
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
    }
    parseCmd(args);
    /* parseCmd(
      msg.content
        .slice(
          0,
          msg.content.length -
            (bot.user.id == '784833064400191509'
              ? 'eb;'.length
              : (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()
                  .length)
        )
        .trim()
        .split(/ +/)
        .reverse()
        .map(v => [...v].reverse().join('')),
      { type: 'end' }
    ); */
    if (msg.author.discriminator === '0000') return;
    // @ts-ignore
    if (require('os').platform == 'linux') return;
  },
};
