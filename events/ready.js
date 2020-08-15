import Discord from "discord.js";
const bot = new Discord.Client;
module.exports = () => {
    console.log(`Logged in as ${bot.user.username}#${bot.user.disciminator}.`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        let TYPE = (activities_list[index] === "NOTICE ME SENPAI!!!!") ? "CUSTOM_STATUS" : "LISTENING";
        bot.user.setActivity(activities_list[index], {"type": TYPE}); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
}