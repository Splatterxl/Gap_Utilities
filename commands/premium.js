module.exports.run=async(bot,msg,args,db,flags) => {if ((flags.includes("c") || flags.includes("check")) && (await db.ref(`premium/${msg.guild.id}`).get()).val()) return msg.reply("It seems premium is enabled on your guild Uw&!")
else if (flags.includes("c") || flags.includes("check")) return msg.reply("Eureka! Premium is not enabled in your guild... big sad")
else if (flags.includes("redeem") || flags.includes("r")) if (args[2].startsWith("EUREKA_PREM_") && args[2].endsWith("_CD_39W8")) db.ref(`premium/${msg.guild.id}`).set(true).then(()=>msg.reply("Done!")) else msg.reply("OwO whats this, an invalid code.")
}
