module.exports = async (num, msg) => 
  msg.channel.messages.cache.array().sort((a, b) => a.createdTimestamp - b.createdTimetamp).reverse()[num]
