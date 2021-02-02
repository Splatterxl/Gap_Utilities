/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const request = require('request'),
  fetch = require('node-fetch');

module.exports = {
  help: {
    name: '>fuck',
    id: 'fuck',
    aliases: [],
    desc: 'Gets some hentai fucking each other idk I never tested the endpoint',
    example: '>fuck',
    category: 'nsfw',
    whitelisted: false,
    voteLocked: true,
  },
  nsfw: true,
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args) => {
    fetch
      .default('https://purrbot.site/api/img/nsfw/fuck/gif')
      .then(res => res.json())
      .then(async body => {
        require('../misc/depression')(
          await msg.channel.send(
            new Discord.MessageEmbed({
              color: 'BLACK',
              footer: {
                text: 'Powered by *Purr*',
              },
              image: { url: body.link },
            })
          ),
          msg
        );
      });
  },
};
