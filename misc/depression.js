module.exports = async (m, msg, ctx) => {
  if (!ctx) return;
  await m.react('🗑️');
  const collector = m.createReactionCollector((r, u) => u.id == msg.author.id || (await ctx.guild.members.fetch(u.id)).permissions.has(ctx.Discord.Permissions.FLAGS.MANAGE_MESSAGES));
  collector.on("collect", r => {
    if (r.emoji.name == '🗑️') m.delete();
  });
};
