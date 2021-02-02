const fetch = require('node-fetch'),
  Discord = require('discord.js');

module.exports.help = {
  name: 'npm',
  id: 'npm',
  example: '>npm npm',
  desc: 'Gets information from the NPM registry!',
  aliases: ['nodepkg', 'pkg'],
  whitelisted: false,
  category: 'utility',
};

module.exports.run = async (bot, msg, args, db, flags, ctx) => {
  if (!ctx.args[1])
    return ctx.respond(
      ctx.util.errorEmbed('You need to provide a search query!')
    );
  const body = await fetch
    .default(
      `https://registry.npmjs.com/${encodeURIComponent(
        ctx.args.slice(1).join(' ')
      )}`
    )
    .then(res => res.json());
  if (body.error && body.error == 'Not found')
    return ctx.respond(
      ctx.util.errorEmbed('No such package has been published!')
    );
  else if (body.error)
    return ctx.respond(ctx.util.errorEmbed(`Got response \`${body.error}\`.`));
  ctx.respond(
    new Discord.MessageEmbed({
      title: `${body.name}@${body['dist-tags'].latest}`,
      description: `${body.description}\n\n**Name**: ${body.name}\n**Latest Version**: ${body}\n**Author**: ${body.author.name} (${body.author.email})`,
    })
  );
};
