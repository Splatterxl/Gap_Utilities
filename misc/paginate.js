const { MessageEmbed, Message, MessageAttachment } = require('discord.js');

/**
 *
 * @param {string | MessageEmbed[]} pages
 * @param {{
 *  message: Message,
 *  respond(content: string | MessageEmbed | MessageAttachment, options?): Promise<Message>
 * }} ctx
 * @param {*} opts
 */
module.exports = async (pages, ctx, opts) => {
  let index = 0;
  if (!pages) return;
  if (!pages[0])
    pages[0] = opts?.default || new Error('No default text specified');
  let m =
    opts?.use || opts?.respond
      ? await ctx.respond(pages[index], opts?.msgOptions)
      : await ctx.message.channel.send(pages[index], opts?.msgOptions);
  function up() {
    m.edit(pages[index], opts?.msgOptions);
  }
  pages.length > 1 ? ['⏮', '◀️', '⏹', '▶️', '⏭'].map(v => m.react(v)) : null;
  const collector = m.createReactionCollector(
    (r, u) => u.id === ctx.message.author.id
  );
  collector.on('collect', (r, u) => {
    r.users.remove(u.id).catch(() => {});
    switch (r.emoji.name) {
      case '▶️':
        index = index == pages.length - 1 ? index : index + 1;
        up();
        break;
      case '◀️':
        index = index ? index - 1 : index;
        up();
        break;
      case '⏮':
        index = 0;
        up();
        break;
      case '⏭':
        index = pages.length - 1;
        up();
        break;
      case '⏹':
        r.message.reactions.removeAll().catch(() => {})
   }
  });
};
