const Discord = require("discord.js")

module.exports.run = async (member, db) => {
  if (!db.get(`settings.g${member.guild.id}.joinNotifs`)) return;
  const channelId = db.get(`settings.g${member.guild.id}.joinNotifs`),
    channel = await client.channels.fetch(channelId).catch(e => null);
  channel.send(`**${member.user.tag}** joined! Welcome!`).catch(e => null)
}
