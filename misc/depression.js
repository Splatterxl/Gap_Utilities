module.exports = async (m, msg, ctx) => {
  if (!ctx) return;
  await m.react('🗑️');
  const collector = m.createReactionCollector((r, u) => u.id == msg.author.id);
  collector.on("collect", r => {
    if (r.emoji.name == '🗑️') m.delete();
  });
};
