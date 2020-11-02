const Discord = require( "discord.js" );

module.exports = (bot, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    newMessage.channel.send(new Discord.MessageEmbed().setTitle("Message Edited").addField("We saw that a message was edited!", `A message was Edited in this channel:\n**Before**: \`${oldMessage}\`\n**After**: \`${newMessage}\``));
}