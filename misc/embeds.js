const Discord = require('discord.js');

module.exports = {
  /**
   * @param {string} example
   * @param {number} min
   */
  noArgs: (example, min) => {
    return new Discord.MessageEmbed({
      title: 'Insufficient Arguments',
      description: `<:redTick:796095862874308678> Please add at least ${min} argument${
        min === 1 ? '' : 's'
      } to the end of your command!`,
      color: 'RED',
    });
  },
  notWhitelisted: () =>
    new Discord.MessageEmbed({
      color: 'RED',
      description:
        '<:redTick:796095862874308678> You need to be whitelisted to use this command!',
    }),
  /**
   * @param {string} permission
   */
  permissionsMissing: permission =>
    new Discord.MessageEmbed({
      color: 'RED',
      description: `<:redTick:796095862874308678> I need the \`${permission.toUpperCase()}\` permission to do that!`,
    }),
  /**
   * @param {string} permission
   */
  userPermissionsMissing: permission =>
    new Discord.MessageEmbed({
      color: 'RED',
      description: `<:redTick:796095862874308678> You need the \`${permission.toUpperCase()}\` permission to do that!`,
    }),
  newGuild: () =>
    new Discord.MessageEmbed({
      title: 'OwO whats this >~<',
      color: 'YELLOW',
      description:
        "Yay! My first message in this server! I've gone ahead and set some stuff up in the database for you, but you can edit them at the [dashboard](splatterxl.tk/utilitybot) (when i get it working).\n\n**Some useful links:**\n[My Invite](https://splatterxl.page.link/UtilityBot).",
    }),
  /**
   *
   * @param {Discord.Message} msg
   */
  afkRemove: msg =>
    new Discord.MessageEmbed({
      color: 'YELLOW',
      description: `Welcome back, <@${msg.author.id}>! I've gone ahead and removed your AFK status for you.`,
    }),
  rejected: r =>
    new Discord.MessageEmbed({
      title: 'fucky wucky error',
      description: r,
      color: 'RED',
    }),
  blacklisted: () =>
    new Discord.MessageEmbed({
      color: 'RED',
      description:
        '<:redTick:796095862874308678> You have been blacklisted from using this bot. Please appeal by DMing <@728342296696979526>.',
    }),
  notNSFW: () =>
    new Discord.MessageEmbed({
      color: 'RED',
      description:
        '<:redTick:796095862874308678> This command can only be used in a NSFW channel!',
    }),
  NSFWGifFound: () =>
    new Discord.MessageEmbed({
      color: 'RED',
      description:
        '<:redTick:796095862874308678> One of the search results was NSFW!',
    }),
};
