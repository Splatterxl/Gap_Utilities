const fetch = require("node-fetch");

module.exports.run = (bot, message, args) => {
  const query = args.slice(1).join(" ");
  if (!args[1])
    return message.channel.send(
      "Give me something to search. I can't guess... Unless?"
    );
  const url = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(
    query
  )}`;
  fetch(url)
    .then((res) => res.json())
    .then((embed) => {
      if (embed && !embed.error) {
        message.channel.send({ embed });
      } else {
        message.reply("No results found!");
      }
    })
    .catch((e) => {
      message.reply(`An error occurred: ${e}`);
    });
};
 module.exports.help = {
  name: '>djs',
  id: 'djs',
  aliases: [ "docs", "doics" ],
  desc: 'Gets stuff from the Discord.js Documentation.',
  example: '>djs Message',
  category: 'utility',
  whitelisted: false,
  nsfw: false
}
