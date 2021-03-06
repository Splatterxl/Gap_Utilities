const Discord = require('discord.js');

module.exports = {
  /**
   * @param {string} example
   * @param {number} min
   */
  noArgs: (example, min) => {
    return new Discord.MessageEmbed({
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
        "Yay! My first message in this server! I've gone ahead and set some stuff up in the database for you, but you can edit them with `>config`.\n\n**Gets started:**\n`>help`",
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
  blacklisted: (reason) =>
    new Discord.MessageEmbed({
      color: 'RED',
      description:
        `<:redTick:796095862874308678> You have been blacklisted from using this bot. **__Reason__**: \`${reason}\``,
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
  errorEmbed: text =>
    new Discord.MessageEmbed({
      color: 'RED',
      description: `<:redTick:796095862874308678> ${text}`,
    }),
  okEmbed: text =>
    new Discord.MessageEmbed({
      color: 'GREEN',
      description: `<:greenTick:796095828094615602> ${text}`,
    }),
  collectorEmbed: (text, time, cancelable = false) => 
    new Discord.MessageEmbed({
      color: "YELLOW",
      description: `<:greyTick:796095848286781481> ${text}`,
      footer: { text: `This prompt will expire in ${time ?? "1 minute"}.${cancelable ? " You can type 'cancel' to cancel." : ""}` },
    }),
  neutralEmbed: (text, toggle = true) => 
    new Discord.MessageEmbed({
      color: "YELLOW",
      description: `${toggle ? "<:greyTick:796095848286781481> " : ""}${text}`,
    })
};
