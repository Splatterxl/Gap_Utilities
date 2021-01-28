module.exports = {
  help: {
    name: ">update",
    id: "update",
    whitelisted: true,
    desc: "Pull updates from Git then restart the bot!",
    aliases: ["gitpull", "up!", "pull", "restart", "reboot"],
    category: "owner"
  },
  run: async (bot, msg, args, db, flags), ctx =>
  {
    if (require('../whitelist').includes(msg.author.id))
    {
      delete require.cache;

      msg.channel.send(`Pulled from Git, output:\n\`\`\`\n${await ctx.util.exec(["git pull"])}\n\`\`\``);
      await msg.channel.send("Restarting all shards (👀 *why????*) through PM2...").then(m => db.set("updatem", `${m.channel.id}-${m.id}`));
      ctx.util.exec(['pm2 restart 0']);
    }
  }
};
