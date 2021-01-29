let Discord = require('discord.js');
let child_process = require('child_process');
let error = require('../misc/Error');
let embed = require('../misc/embeds');
let hastebin = require('hastebin-gen');

// @ts-ignore
let whitelist = require('./../whitelist');

module.exports = {
	help: {
		name: `>unix`,
		id: `unix`,
		aliases: ['exec', 'u'],
		whitelisted: true,
		desc: `A *NIX command for you peeps (whitelisted)`,
		example: `>unix ls`
	},
	/**
	 * @param {Discord.Client} bot
	 * @param {Discord.Message | Discord.PartialMessage} msg
	 * @param {string[]} args
	 */
	run: async (bot, msg, args, db, flags, ctx) => {
		if (!whitelist.includes(msg.author.id))
			return msg.channel.send(embed.notWhitelisted());
		ctx.util.paginate(
			(await ctx.util.exec([ctx.unfiltered_args.slice(1).join(' ')], ctx)).match(
				/[\s\S]{1,1850}/g
			),
			ctx,
			{ respond: true, default: '\u200b', msgOptions: { code: 'bash' } }
		);
	}
};
