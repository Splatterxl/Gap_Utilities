let Discord = require("discord.js");
let child_process = require("child_process");
let error = require("../misc/Error");
let embed = require('../misc/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require("./../whitelist");

module.exports = {
    help: {
        name: `>unix`,
        id: `unix`,
        aliases: ["exec", "u"],
        whitelisted: true,
        desc: `A *NIX command for you peeps (whitelisted)`,
        example: `>unix ls`
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if (!(whitelist.includes(msg.author.id))) return msg.channel.send(embed.notWhitelisted());
        else
        {
            try
            {
                msg.channel.startTyping();
                await child_process.exec(args.slice(1).join(' '), async(e, stdout, stderr) =>
                {
                    const evalOutput = stdout + "\n\n\n" + stderr, typ = "Unix Command-Line Output"
                    // @ts-ignore
                    // msg.channel.send((stdout.length <= 1023) ? embed.unixRes(stdout, stderr) : hastebin(stdout + '\n\n\n' + stderr, { extension: 'js' }).then(haste => msg.channel.send('Output was too long. ' + haste)));
                    const evaled = evalOutput.match(/(\s|\S){1,1850}/g);
        let index = 0;
        const em = await msg.channel.send(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}. Page ${index + 1} of ${evaled.length}\`\`\``).catch(e => msg.channel.send(embeds.rejected(e)));
        ['❌', '⏮', "◀️", "▶️", '⏭', '🗑️'].map(v => em.react(v));
        const collector = em.createReactionCollector((r, u) => (u.id === msg.author.id));
        collector.on('collect', (r) =>
        {
            switch (r.emoji.name)
            {
                case '❌':
                    em.edit('```\nResults closed.```');
                    break;
                case "▶️":
                    index = (index == (evaled.length - 1)) ? index : index + 1;
                    em.edit(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}. Page ${index + 1} of ${evaled.length}\`\`\``);
                    break;
                case "◀️":
                    index = index ? index - 1 : index;
                    em.edit(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}. Page ${index + 1} of ${evaled.length}\`\`\``);
                    break;
                case "⏮":
                    index = 0;
                    em.edit(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}. Page ${index + 1} of ${evaled.length}\`\`\``);
                    break;
                case "⏭":
                    index = evaled.length - 1;
                    em.edit(`\`\`\`js\n${evaled[index].replace(__dirname.replace(/((commands\/))/g, ""), "/root/eureka/")}\n\nTypeof output: ${typ}, Length: ${evalOutput.length}. Page ${index + 1} of ${evaled.length}\`\`\``);
                    break;
                case "🗑️":
                    em.delete();
                    collector.stop();
                    break;
            }
        });

        collector.on('end', c =>
        {
            console.log('Collected ${c.size} emojis');
            if (msg.channel.messages.cache.get(em.id))
                em.edit(em.content + `\nCollector closed. Collected ${c.size} reactions.`).catch(e => null);
        });
                    msg.channel.stopTyping(true);
                });
            } catch (e)
            {
                msg.react('❌');
                msg.channel.stopTyping(true);
            }
        }
    }
};
