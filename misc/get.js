const assert = (data, target) => data.toLowerCase() == target || data.toLowerCase().startsWith(target) || data.toLowerCase().includes(target)

module.exports.member = async (ctx, target) => (await ctx.guild.members.fetch(target, true).catch(e => null)) ?? ctx.guild.members.cache.find(v => assert(v.user.id, target) || assert(v.displayName, target) || assert(v.user.tag, target) || assert(v.user.username, target));
module.exports.user = async (ctx, target) => (await ctx.client.users.fetch(target, true).catch(e => null)) ?? ctx.client.users.cache.find(v => assert(v.id, target) || assert(v.tag, target) || assert(v.username, target));
