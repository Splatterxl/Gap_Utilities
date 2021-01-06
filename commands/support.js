module.exports = {
  help: {
    name:">support",
    id: "support",
    aliases: ["server","helpisontheway"],
    desc:"Get the invite link of the Support Server",
    example: "Support",
    whitelisted: false
  },
  run: async(bot,msg)=>msg.reply("discord.gg/"+(await bot.guilds.cache.find(g=>g.name=="Eureka! Backend").fetchInvites()).first().code)
}
