const files = require("fs").readdirSync("./misc").filter(v => v.endsWith(".js")).map(v => [v, require(`./${v}`)]);

const object = {};

files.forEach(v => object[v[0]] = v[1]);

module.exports = object;
