module.exports.run = async (member, db) => {
  if (!db.get(`settings.g${member.guild.id}.joinNotifs`)) return;
  const client = member.guild.channels.cache.first().messages.cache.first().client,
    channelId = db.get(`settings.g${member.guild.id}.joinNotifs`),
    channel = await client.channels.fetch(channelId).catch(e => null);
  channel.send(`**${member.user.tag}** joined! Welcome!`).catch(e => null)
}
