module.exports.help = {
  name: 'source',
  id: 'source',
  usage: '>source [command]',
  desc: 'Gets the link to a GitHub blob of a command',
  aliases: ['src'],
  whitelisted: false,
  category: 'bot',
};

module.exports.run = (bot, msg, args) =>
  msg.reply(
    `<https://github.com/nearlySplat/Gap_Utilities/blob/master/commands/${
      global.cmds.find(
        c =>
          c.help?.id == args[1] ||
          c.help?.aliases?.includes(args[1]) ||
          c.help?.id == 'source'
      ).help.id
    }.js>`
  );
