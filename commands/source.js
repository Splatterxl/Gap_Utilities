module.exports.run=(bot,msg,args)=>msg.reply(`<https://github.com/nearlySplat/Gap_Utilities/blob/master/commands/${global.cmds.find(c=>c.help.id==args[1]||c.help.id=="source").help.id}.js`)
