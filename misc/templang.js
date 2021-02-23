function templang(str, obj = {}) {
  // original string; see first comment
  const original = str;
  // matched strings, you could use 'matched.map(value => eval(`obj.${value}`))' if you wanted.
  const matched = str
    .match(/{{[^}]+}}/g)
    ?.map((v) => v.replace(/::/g, "."))
    .map((v) => v.replace(/(^{{|}}$)/g, ""));
  // values from the matched output and the object
  const values = matched
    ?.map((v) => (v.includes(".") ? obj[v.match(/[^\.]+/g)[0]] : v))
    .map((v, i) => {
      let currentEl = v;
      for (let element of matched[i].match(/[^.]+/g).slice(1)) {
        currentEl = currentEl?.[element];
      }
      return currentEl;
    });
  // modify the string
  matched?.map((v, index) => {
    while (str.includes(`{{${v.replace(/\./g, "::")}}}`))
      str = str.replace(
        new RegExp(`{{${v.replace(/\./g, "::")}}}`, "g"),
        values[index]
      );
  });
  return str;
}

module.exports = templang;
