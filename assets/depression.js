module.exports = async (m, msg) => {
  await m.react("796095862874308678");
  const collector = m.createReactionCollector((r, u) => u.id == msg.author.id);
  collector.on("collect", r => {
    if (r.emoji.id == "796095862874308678") m.delete();
  });
}
