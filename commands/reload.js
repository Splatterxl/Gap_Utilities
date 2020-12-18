const Discord = require('discord.js');

module.exports = {
    help: {
        name: '>reload',
        id: 'reload',
        desc: 'Reload a(ll) command(s)'
    },
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    run: async (bot, msg, args) =>
    {
        (require('../events/commandLoader'));
    }
};