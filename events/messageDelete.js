const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message | Discord.PartialMessage} m
     */
    run: (bot, m) =>
    {
        (require('./log'))(bot, m.author.bot, m.guild, null, 'delete', { m: m });
        console.log(`[DELETE] ${(m.author.bot) ? 'Bot' : 'User'} ${m.author.tag} deleted message '${m.content}' in ${(m.guild) ? `server '${m.guild.name}' (ID ${m.guild.id})` : 'DM to UtilityBot.'}`);
    }
};