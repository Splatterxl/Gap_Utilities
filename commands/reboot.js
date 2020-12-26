const Discord = require('discord.js');
const embeds = require('../assets/embeds');

module.exports = {
    help: {
        name: '>reboot',
        id: 'reboot',
        desc: 'Reboot the bot'
    },
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    run: async (bot, msg, args) =>
    {
        if (msg.author.id === '728342296696979526')
        {
            let m = await msg.channel.send('Nooooooo');
            setTimeout(async () => m = await m.edit(`${m.content}\nI don't want to gooooo!`), 1000);
            setTimeout(async () => m = await m.edit(`${m.content}\nPlease don't make me go!`), 2000);
            setTimeout(async () => m = await m.edit(`${m.content}\nWelp, I must.`), 3000);
            setTimeout(async () => m = await m.edit(`${m.content}\nDeleting \`require.cache\`...`), 4000);
            delete require.cache;
            setTimeout(async () => m = await m.edit(`${m.content}\n...`), 5000);
            setTimeout(async () => m = await m.edit(`${m.content}\n\`require.cache\` has been deleted!`), 6000);
            setTimeout(async () => m = await m.edit(`${m.content}\n:wave: Honey, I'm home!`), 7000);

        } else return msg.reply(embeds.notWhitelisted());
    }
};