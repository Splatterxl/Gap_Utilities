module.exports = {
  help: {
    name: ">update",
    id: "update",
    whitelisted: true,
    desc: "Pull updates from Git then restart the bot!",
    aliases: ["gitpull", "up!", "pull", "restart", "reboot"],
    category: "owner"
  },
  run: async (bot, msg, args, db, flags) => { delete require.cache; await msg.channel.send("Restarting bot...").then(m => db.ref("updatem").set(`${m.channel.id}-${m.id}`)); require("child_process").execSync("git pull && pm2 restart 0"); }
};
