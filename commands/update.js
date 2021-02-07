module.exports = {
  help: {
    name: ">update",
    id: "update",
    whitelisted: true,
    desc: "Pull updates from Git then restart the bot!",
    aliases: ["gitpull", "up!", "pull", "restart", "reboot"],
    category: "owner",
   whitelisted: true,
    permLvl: 6
  },
  run: async (bot, msg, args, db, flags, ctx) =>
  {
      await ctx.respond(`Pulled from Git, output:\n\`\`\`\n${await ctx.util.exec(["git pull"])}\n\`\`\`\nRestarting all shards (👀 *why????*) through PM2...`).then(m => db.set("updatem", `${m.channel.id}-${m.id}`))
      ctx.util.exec(['pm2 restart 0']);
    
  }
};
