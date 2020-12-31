module.exports = str => {
  let flags = str.match(/((--\w+)|(-\w))/g);
  flags?.forEach((v,i,a)=>a[i]=v.slice(v.startsWith("--")?2:1));
  return flags;
}
