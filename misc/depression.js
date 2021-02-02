const Discord = require('discord.js'); // eslint-disable-line no-unused-vars

/**
 *
 * @param {Discord.Message} m
 * @param {Discord.Message} msg
 * @param {{Discord: Discord, whitelist: string[], guild?: Discord.Guild}} ctx
 */
module.exports = async (m, msg, ctx) => {
  if (!ctx) return;
  await m.react('🗑️');
  const collector = m.createReactionCollector(
    (r, u) => !u.bot && (u.id == msg.author.id || ctx.whitelist.includes(u.id))
  );
  collector.on('collect', r => {
    if (r.emoji.name == '🗑️') m.delete();
  });
};
