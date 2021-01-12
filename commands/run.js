const Discord = require('discord.js');
const fs = require('fs');
let embeds = require('../misc/embeds');
const proc = require('child_process');

module.exports = {
    help: {
        "name": ">ping",
        "id": "eval",
        "aliases": [
            "ping",
            "pong"
        ],
        "desc": "Test if the bot is online!",
        "example": ">ping"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        return;
        try
        {
            let now = Date.now();
            if (args.slice(1).join(" ").includes("require(") || args.slice(1).join(" ").includes("child_process") || args.slice(1).join(" ").includes("token") || args.slice(1).join(" ").includes(bot.token)) return msg.reply("Some random error occurred, try again later!");
            if (args.slice(1).join(' ') == 'process') return msg.reply(require('./mock').run(bot, msg, ['mock', 'oh', 'no,', 'dont', 'crash', 'me'])).catch(r => null);
            proc.execSync('cd tmp && mkdir ' + now);
            fs.writeFileSync(`./tmp/${now}/index`, `try {(()=>console.log(eval(\`${args.slice(1).join(' ').replace(/\\/g, '\\\\').replace(/\`/g, '\\`')}\`)))()}catch (e) {console.log(e)}`);
            msg.reply(`\`\`\`js\n${proc.execSync(`cd tmp && cd ${now} && node index ${((require('os')).EOL === '\r\n') ? '' : `&& rm -rf ${now}`}`).toString().replace(__dirname, ".").replace("/index:", "[stdin]:").replace(bot.token, "Never gonna give you up, never gonna let you down")}\`\`\``).catch(r => null);
        } catch (e)
        {
            throw e;
        }
    }
};
