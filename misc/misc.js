const files = require("fs").readdirSync("./misc").filter(v => v.endsWith(".js")).map(v => [v, require(`./${v}`)]);

let default = {
  resolveCommand(string) {
    if (!string || typeof string !== "string") throw new this.InternalError("INVALID_COMMAND", "An invalid command to resolve was specified.")
    return cmds.find(v => v.help?.name == `>${string}` || v.help?.id == string || v.help?.aliases?.includes(string)) || null;
  },
  InternalError: class InternalError extends Error {
    constructor (name, message) {
      super("!!{text}!!");
      this.name = name;
      this.message = message;
      this.stack = super.stack.replace(/!!\{text\}!!/g, message);
    }
  }
};

let object = default;

files.forEach(v => object[v[0].replace(/\.js/g, "")] = v[1]);

module.exports = object;
