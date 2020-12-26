module.exports.run = (bot, msg, args) =>
{
    if ((await(db.ref('gbl').get())).val()[user.id]) msg.guild.members.ban(m.user).catch(e => null);
}