module.exports = {
  help: {
    name: ">update",
    id: "update",
    whitelisted: true,
    desc: "Pull updates from Git then restart the bot!",
    aliases: ["gitpull", "up!", "pull", "restart", "reboot"],
    category: "owner"
  },
  run: async (bot, msg, args, db, flags) =>
  {
    if (require('../whitelist').includes(msg.author.id))
    {
      delete require.cache;

      msg.channel.send(`Pulled from Git, output:\n\`\`\`\n${require("child_process").execSync("git pull").toString()}\n\`\`\``);
      await msg.channel.send("Restarting all shards (👀 *why????*) through PM2...").then(m => db.ref("updatem").set(`${m.channel.id}-${m.id}`));
      require('child_process').execSync('pm2 restart 0');
    }
  }
};