const { Message, MessageEmbed } = require('discord.js');
class Base {
  _run;
  _meta;
  constructor(meta, callback, ctx) {
    (() => {
      if (!meta || !callback)
        return Promise.reject(
          'Invalid parameters; wanted a meta object and a callback'
        );
      if (!(typeof callback === 'function'))
        return Promise.reject(
          'Invalid parameters; callback must be a function.'
        );
      this._run = callback;
      this._meta = meta;
      // Object.entries(ctx).forEach(([K, V]) => this[K] = V)
    })();
  }
  get run() {
    return this._run;
  }
}
exports.BaseCommand = class extends (
  Base
) {
  constructor(meta, callback) {
    super(meta, callback);
  }
  get help() {
    return this._meta;
  }
  get run() {
    return this._run;
  }
  get nsfw() {
    return this._meta.nsfw;
  }
};

exports.BaseEvent = class extends (
  Base
) {
  constructor(meta, callback) {
    super(meta, callback);
  }
};

exports.EditedMessage = /*class extends*/ Message /*{
  constructor (client, oldMessage, newMessage, channel) {
    if (oldMessage.content != newMessage.content) 
      super(client, oldMessage, channel);
    else {};
    this.content = newMessage.content;
    this.oldContent = oldMessage.content;
  }
}*/
