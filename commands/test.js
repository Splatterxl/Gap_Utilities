const { BaseCommand } = require('../structures/classes');

module.exports = class Test extends BaseCommand
{
    constructor ()
    {
        super({
            name: 'test',
            id: 'test',
            aliases: [],
            category: 'utility',
            nsfw: false,
            whitelisted: false
        }, ([bot, msg, args, db, flags]) =>
        {
            msg.channel.send('hi');
        });
        console.log(this._run);
    }
};