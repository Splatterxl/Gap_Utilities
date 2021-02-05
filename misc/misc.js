const files = require('fs')
  .readdirSync('./misc')
  .filter(v => v.endsWith('.js'))
  .map(v => [v, require(`./${v}`)]);

let defaultUtils = {
  resolveCommand(string) {
    if (!string || typeof string !== 'string')
      throw new this.InternalError(
        'INVALID_COMMAND',
        'An invalid command to resolve was specified.'
      );
    return (
      cmds.find(
        v =>
          v.help?.name == `>${string}` ||
          v.help?.id == string ||
          v.help?.aliases?.includes(string)
      ) || null
    );
  },
  InternalError: class InternalError extends Error {
    constructor(name, message) {
      super('!!{text}!!');
      this.name = name;
      this.message = message;
      this.stack = super.stack?.replace(/!!\{text\}!!/g, message) || null;
    }
  },
  typename(obj) {
    const { inspect } = require('util');
    if (typeof obj == 'function') {
      const [name] =
        /(?:function|class) ( *)?(\w+)( ( *)?((?:extends|implements) ( *)?(\w+)){0,2})?/g.exec(
          obj.toString?.() ?? inspect(obj).replace(/[[\]]/g, '')
        ) || [];
      return name?.replace(/(class|function)\s+/, '') ?? '(anonymous)';
    } else {
      const [name] =
        /(?:function|class) ( *)?(\w+)( ( *)?((?:extends|implements) ( *)?(\w+)){0,2})?/g.exec(
          obj?.constructor?.toString?.() ??
            inspect(obj?.constructor).replace(/[\[\]]/g, '')
        ) || [];
      return name?.replace(/(class|function)\s+/, '').trim() ?? null;
    }
  },
  getCharCodes(str) {
    return [...str].map((v, i) => str.charCodeAt(i));
  },
};

let object = defaultUtils;

files.forEach(v => (object[v[0].replace(/\.js/g, '')] = v[1]));

module.exports = object;
