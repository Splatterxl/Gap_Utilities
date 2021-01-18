const files = fs.readdirSync("./misc").map(v => [v, require(`./${v}`)]);

const object = {};

files.forEach(v => object[v[0]] = v[1]);

module.exports = object;
