module.exports.run=async(bot,msg,args,db,flags) => {if ((flags.includes("c") || flags.includes("check")) && (await db.ref(`premium/${msg.guild.id}`).get()).val()) return msg.reply("It seems premium is enabled on your guild UwU!")
else if (flags.includes("c") || flags.includes("check")) return msg.reply("Eureka! Premium is not enabled in your guild... big sad")
else if (flags.includes("redeem") || flags.includes("r")) if ((await db.ref(`prem_codes/${args[2]}`).get()).val()) db.ref(`premium/${msg.guild.id}`).set(true).then(()=>msg.reply("Done, this server will now enjoy Premium forever!")); else msg.reply("OwO whats this, an invalid code.")
}
