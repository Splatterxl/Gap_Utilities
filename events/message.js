
const Discord = require(`discord.js`),
    // const { global } = require('node/globals.global');
    embeds = require('../misc/embeds'),
    chalk = require("chalk"),
    err = require('../misc/errorHandler.js');

module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, db) =>
    {
        if ((!msg.guild) || (msg.guild == undefined) || (msg.channel.type === 'dm') || cmds == undefined) return;


        if (!((await db.ref(`settings/${msg.guild.id}`).get()).val()))
        {
            db.ref(`settings/${msg.guild.id}`).set(global.settings.settings.default);


        };
        
            if (msg.member === null) return;
            if (msg.member.displayName.startsWith('[AFK]') || (await db.ref(`afk/${msg.guild.id}/${msg.author.id}`).get()).val()) 
            {
                // msg.member.setNickname(msg.member.displayName.startWith('[AFK]') ? msg.member.displayName.slice(6) : msg.member.displayName).catch(e => null);
                msg.channel.send(embeds.afkRemove(msg));
                db.ref(`afk/${msg.guild.id}/${msg.author.id}`).remove();
            }
        
        require('../misc/pinged').run(bot, msg, db);
        let flags = require("../misc/flags");
        flags = new flags(msg.content);

        // @ts-ignore
        let args = msg.content.slice(bot.user.id == '784833064400191509' ? 'eb;'.length : (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val().length).trim().split(/ +/);
        let ctx = {
          client: bot,
          message: msg,
          args,
          db,
          util: require("../misc/misc.js"),
          channel: msg.channel,
          guild: msg.guild,
          respond: async function (...data) {
              if (this.client.responses.has(this.message.id) && await this.channel.messages.fetch(this.message.id).catch(e => null)) bot.responses = this.client.reponses.set(this.message.id, await this.client.responses.get(this.message.id).edit(data).catch(() => bot.responses = this.client.reponses.set(this.message.id, await this.client.responses.get(this.message.id).channel.send(data)));
              else if (this.client.responses.has(this.message.id)) {
                this.client.responses.delete(this.message.id)
                bot.reponses = this.client.responses.set(this.message.id, await this.message.channel.send(data));
              } else bot.reponses = this.client.responses.set(this.message.id, await this.message.channel.send(data));
              
              return this.client.responses.get(this.message.id)
          }
        };
        (async function ()
        {
            if (msg.author.bot) return;
            if ((bot.user.id == "784833064400191509" && msg.content.startsWith('eb;')) || (bot.user.id !== '784833064400191509' && (msg.content.startsWith((await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()) || msg.author.id === '728342296696979526')))
            {
                if (msg.author.id === '728342296696979526') args = msg.content.startsWith(bot.user.id == "784833064400191509" ? 'eb;' : (await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()) ? args : msg.content.split(/ +/);
                // try
                // {
                if (global.settings.blacklist.includes(msg.author.id) && cmds.find(v => v.help?.aliases?.includes(args[0]) || v.help?.id == args[0])) return msg.channel.send(embeds.blacklisted());
                // @ts-ignore
                const cmd = cmds.find(v => v.help?.aliases?.includes(args[0]) || v.help?.id == args[0]); console.log(cmd);
                if (cmd?.nsfw && !msg.channel.nsfw) return msg.channel.send(new Discord.MessageEmbed({ color:"RED", description: "Use this command in a NSFW channel, dumdum." }));
                if (cmd?.help?.requiredPerms) { 
                  const perms = cmd?.help?.requiredPerms?.map(v => [v, msg.guild.me.permissions.has(Discord.Permissions.FLAGS[v])])
                    .filter(v => v[1] === false)
                    .map(v => v[0]);
                  if (!perms) return;
                  return msg.channel.send(new Discord.MessageEmbed({description:"<:redTick:796095862874308678"+`> I am missing the following required permission${perms.length > 1 ? "s" : ""}: `+perms.map((v, i, a) => i == (a.length - 1) ? v : i == (a.length - 2) ? `${v} and ` : `${v}, `).join("").replace(/[^ ,and]+/g, v => `\`${v}\``),color:"RED"})) 
                }
                try
                {
                    await cmd?.run(bot, msg, args, db, flags, ctx);
                } catch (e)
                {
                    msg.channel.send(err.find(e));
                }

                // @ts-ignore
                // if (global.settings.blacklist.includes(msg.author.id)) return msg.channel.send(embeds.blacklisted());
                // @ts-ignore
                // try { global.cmds.get(args[0]).run(bot, msg, args, db, flags); }
                // catch (e) { msg.react('❌'); return msg.reply(`An error occurred in the MessageHandler for \`${msg.content}\`: \`\`\`\n${e}\`\`\``); } console.log(`triggered command`);
                // } catch (err) { return msg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
            }
        })();
        if (msg.author.discriminator === '0000') return;
        // @ts-ignore
        if (require("os").platform == "linux") return;
        // return console.log(chalk`{yellow MESSAGE} User ${msg.author.tag} sent message \`${msg.content}\` ${(msg.guild) ? `in channel '${msg.channel.name}', server '${msg.guild.name}' (ID ${msg.guild.id})}` : `in a DM to ${bot.user.username}.`}`);
    }
};
