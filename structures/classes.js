const { Message, MessageEmbed } = require('discord.js');
class Base
{
    _run;
    _meta;
    constructor (meta, callback)
    {
        (() =>
        {
            if (!meta || !callback) return Promise.reject("Invalid parameters; wanted a meta object and a callback");
            if (!(typeof callback === 'function')) return Promise.reject('Invalid parameters; callback must be a function.');
            this._run = callback;
            this._meta = meta;
        })();
    }
    get run()
    {
        return this._run;
    }
}
exports.BaseCommand = class extends Base
{
    constructor (meta, callback)
    {
        super(meta, callback);
    }
    get help()
    {
        return this._meta;
    }
    get run()
    {
        return this._run;
    }
    get nsfw()
    {
        return this._meta.nsfw;
    }
};

exports.BaseEvent = class extends Base
{
    constructor (meta, callback)
    {
        super(meta, callback);
    }

};