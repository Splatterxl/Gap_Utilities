module.exports.run = (bot, msg, args, db, flags) => {
  const collector msg.channel.createMessageCollector((m3)=>m3.author.id==msg.author.id, { time:15000 });
  collector.on("collect", m=>m.reply("yay u sent message"))
}
