module.exports = str => {
  let flags = str.match(/((--\w+)|(-\w))/g);
  return flags?.map(v=>v.slice(v.startsWith("--")?2:1));
}
