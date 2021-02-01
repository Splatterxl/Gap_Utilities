module.exports.help = {
  name: ">blackout",
  id: "blackout", 
  aliases: [ "spoilerspam" ],
  desc: [..."Spoilers!"].map(v => `||${v}||`).join("")),
  category: "fun",
  whitelisted: false,
  example: ">blackout Hi!"
};

module.exports.run = (a,b,c,d,e,ctx) => ctx.respond([...ctx.args.slice(1).join("")].map(v => `||${v}||`).join(""))
