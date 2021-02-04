const Discord = require('discord.js');

module.exports.run = async (a, b, args, d, e, ctx) => {
  if (!ctx.args[2])
    return ctx.respond(
      ctx.util.embeds.errorEmbed(
        'Incorrect usage; should have at least two parameters (`{type: string} {user: ResolvableUser}`)'
      )
    );
  let target = args.slice(2).join(' ').toLowerCase(),
    usr = await ctx.util.get.user(ctx, target);
  if (!usr)
    return ctx.respond(
      ctx.util.embeds.errorEmbed('I could not find that user!')
    );
  let action, reason;
  usr = usr?.id;
  const data = ctx.db.get(`blacklist.${usr}`);
  switch (args[1]) {
    case 'check':
      ctx.respond(
        ctx.util.embeds.neutralEmbed(
          `**${ctx.client.users.cache.get(usr).tag}** is ${
            data ? '' : '__not__ '
          }blacklisted${data ? ' for `' + data + '`' : ''}.`,
          false
        )
      );
      break;
    case 'add':
      if (data)
        return ctx.respond(
          ctx.util.embeds.errorEmbed('That user is already blacklisted!')
        );
      ctx.channel.send(
        ctx.util.embeds.collectorEmbed(
          `What reason should I add **${
            ctx.client.users.cache.get(usr).tag
          }** to the blacklist for?`,
          '1 minute',
          true
        )
      );
      try {
        reason = (
          await ctx.channel.awaitMessages(
            m => m.author.id == ctx.message.author.id,
            { max: 1, time: 60000, errors: ['time'] }
          )
        ).first().content;
      } catch {
        return ctx.respond(
          ctx.util.embeds.errorEmbed("You didn't send a message in time!")
        );
      }
      if (!reason) return;
      if (reason == 'cancel')
        return ctx.respond(ctx.util.embeds.neutralEmbed('Cancelled'));
      ctx.db.set(`blacklist.${usr}`, reason);
      action = 'add';
      ctx.respond(
        ctx.util.embeds.okEmbed(
          `Successfully blacklisted **${ctx.client.users.cache.get(usr).tag}**.`
        )
      );
      break;
    case 'remove':
    case 'rm':
      if (!data)
        return ctx.respond(
          ctx.util.embeds.errorEmbed("That user isn't blacklisted!")
        );
      ctx.db.delete(`blacklist.${usr}`);
      action = 'remove';
      ctx.respond(
        ctx.util.embeds.okEmbed(
          `Successfully unblacklisted **${
            ctx.client.users.cache.get(usr).tag
          }**.`
        )
      );
      break;
  }
  if (action)
    ctx.client.channels.fetch('800804128938131507').then(v =>
      v.send(
        new Discord.MessageEmbed({
          title: 'Blacklist Modified',
          description: `**Action**: ${action}\n**Staff Member**: ${
            ctx.message.author.tag
          } (${ctx.message.author.id})\n**User**: ${
            ctx.client.users.cache.get(usr).tag
          } (${usr})\n**Reason**: ${reason ?? 'None'}`,
          color: 'YELLOW',
        })
      )
    );
};
module.exports.help = {
  name: '>bl',
  id: 'bl',
  aliases: ['blacklist'],
  desc: 'Yikes, an alias as a command name!',
  category: 'owner',
  whitelisted: true,
  example: '>blacklist add Splatterxl#8999 bad boi',
};
