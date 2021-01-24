module.exports = (async (num, msg) => {
  await msg.channel.messages.fetch();
  return msg.channel.messages.cache.map(v => v)[msg.channel.messages.cache.map(v => v).indexOf(msg) - num]
})
