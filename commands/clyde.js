/* "use strict";

const Discord = require('discord.js');
let embeds = require('../assets/embeds');
const canvas = require('canvas');

module.exports = {
  help: {
    "name": ">clyde",
    "id": "clyde",
    "aliases": [
      "clydemsg"
    ],
    "desc": "Send a message as Clyde!",
    "example": ">clyde e",
    "category": "images"
  },
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message | Discord.PartialMessage} msg
   * @param {string[]} args
   */
  run: async (bot, msg, args) =>
  {
    if (!args[1] || msg.author.id !== '728342296696979526') return;
    let canvase = canvas.createCanvas(661, 87);
    let context = canvase.getContext('2d');
    context.drawImage(await (canvas.loadImage('./assets/clyde.png')), 0, 0);
    context.fillStyle = '#fff';
    context.font = 'normal 30px Whitney';
    context.fillText(args.slice(1).join(''), 77, 60);
    let attachment = new Discord.MessageAttachment(canvase.toBuffer('image/png'), 'clyde.png');
    msg.channel.send(attachment);
  }
};
*/
