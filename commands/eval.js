/* eslint-disable @typescript-eslint/no-var-requires */
const error = require('../misc/Error');
const { inspect } = require('util');
const err = require('../misc/errorHandler');
const Discord = require('discord.js');
module.exports = {
	help: {
		name: '>eval',
		id: 'eval',
		aliases: ['eval', 'e'],
		desc: 'A little evaluation command! (Restricted to owner.)',
		example: '>eval console.log("An Example.")',
		category: 'owner',
		whitelisted: true,
		nsfw: false
	},
	run: async (bot, msg, args, db, flags, ctx) => {
		if (!ctx.whitelist.includes(msg.author.id))
			return msg.channel.send(embeds.notWhitelisted());

		let depth = parseInt(args[1]),
			raw = args.slice(isNaN(depth) ? 1 : 2).join(' ');
		if (isNaN(depth)) depth = 0;
		if (!raw) return ctx.respond('You must specify code to execute.');
		let evalOutput;
		const em = await ctx.respond(`Computing...`).catch((e) => e);
		console.log(em);
		try {
			evalOutput = await eval(`${flags.includes('async') ? '(async()=>{' : ''}${raw.replace(/((\n)?```$|^```(js)?(\n)?)/g, "")}${flags.includes('async') ? '})()' : ''}`);
		} catch (e) {
			evalOutput = e;
		}
		const typ = typeof evalOutput;
		evalOutput =
			typ == 'string'
				? evalOutput
				: inspect(evalOutput, { depth: depth });
		await ctx.util.paginate(
			evalOutput
				.match(/[\S\s]{1,1850}/g)
				.map(
					(v, i, a) =>
						`${v}\n\n${typ} => ${evalOutput.length} chars. Page ${
							i + 1
						} of ${a.length}`
				),
			ctx,
			{
				use: em,
				msgOptions: { code: typ == 'string' ? 'LOLCODE' : 'js' }
			}
		);
                await em.react("🔁");
                const collector = em.createReactionCollector((r, u) => u.id == ctx.message.author.id && r.emoji.name == "🔁");
                collector.on("collect", () => ctx.client.emit("message", ctx.message)) 
	}
};
