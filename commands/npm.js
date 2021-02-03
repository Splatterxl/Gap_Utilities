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
      ctx.util.embeds.errorEmbed('You need to provide a search query!')
    );
  await ctx.message.react('761675912102019103');
  const body = await fetch
    .default(
      `https://registry.npmjs.com/${encodeURIComponent(
        ctx.args.slice(1).join(' ')
      )}`
    )
    .then(res => res.json());
  if (body.error && body.error == 'Not found')
    return ctx.respond(
      ctx.util.embeds.errorEmbed('No such package has been published!')
    );
  else if (body.error)
    return ctx.respond(
      ctx.util.embeds.errorEmbed(`Got response \`${body.error}\`.`)
    );
  ctx.respond(
    new Discord.MessageEmbed({
      title: `${body.name}@${body['dist-tags'].latest}`,
      color: 'RED',
      description: `**Name**: ${body.name}\n**Description**: ${
        body.description
      }\n**Latest Version**: ${body['dist-tags'].latest}\n**Author**: ${
        body.author?.name
      } (${body.author?.email})\n**Versions**:\n${Object.entries(
        body['dist-tags']
      )
        .filter(([K]) => K.includes('latest'))
        .map(([K, V]) => {
          return `⇒ __${
            K == 'latest' ? 'Latest' : K.includes("latest-") ? `${K.replace(/latest-/g, '')}nd latest` : K.replace(/[\b]w/g, v => v.toUpperCase()).replace(/[-_]/g, "")
          }__: ${V}`;
        })
        .join('\n')}\n**Maintainers**:\n${body.maintainers
        .map(v => {
          return `⇒ __${v.name}__ (${v.email})`;
        })
        .join('\n')}\n**Installation**: \`npm install ${body.name} --save\``.replace(/\n( \S)?(\*\*|__)[^\*]+(\*\*|__) undefined( \(undefined\))?/g, ""),
    })
  );
  return ctx.message.reactions.resolve("<a:loading:761675912102019103>".replace(/[^\d]/g, "")).users.remove(ctx.client.user.id)
};
