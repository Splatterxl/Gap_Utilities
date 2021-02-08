const Discord = require('discord.js');

module.exports.run = async (a, b, args, d, e, ctx) => {
  (ctx.args.slice(1).length ? ctx.args.slice(1) : [ctx.message.author.id]).forEach(v => ctx.util.get.member(ctx, v).then(v => {let name = v.displayName; v.setNickname?.(msg.member.displayName.replace(/(^[!.?,\-\/:;()€&@”[\]{}£\#%\^\*\+=•¥’!\$\?\s]+|(^[\S.]$))/g, "").trim().replace(/\s+/g, " ")).then(m => ctx.channel.send(`Dehoisted \`${name}\` to \`${m.displayName}\`.`))}));
};
module.exports.help = {
  name: '>dehoist',
  id: 'dehoist',
  aliases: ['deh'],
  desc: 'Dehoists a member.',
  category: 'moderation',
  whitelisted: false,
  example: '>dehoist <member>',
  permLvl: 2
};
