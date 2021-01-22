module.exports = async (m, msg, ctx) => {
  if (!ctx) return;
  const id = "<:dnd:797809552565338153>".match(/\d+/g)[0];
  await m.react(id);
  const collector = m.createReactionCollector((r, u) => u.id == msg.author.id);
  collector.on("collect", r => {
    if (r.emoji.id == id) m.delete();
  });
}
