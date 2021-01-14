const Discord = require('discord.js');
const idify = require("../misc/idify");
const err = require("../misc/errorHandler");

module.exports = {
    help: {
        "name": ">whois",
        "id": "whois",
        "whitelisted": false,
        "aliases": [
            "ui",
            "userinfo",
            "profile"
        ],
        "desc": "Gets a profile on a user.",
        "example": ">whois 13802482938501",
        "category": "utility"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args, db, flags) =>
    {
        try
        {

            let member = flags.getObj().solo?.includes("fetch") ? await msg.guild.members.fetch(idify(args[1])) : msg.guild.members.cache.find(u => u.user.id == idify(args[1]) || u.user.username.toLowerCase().includes(args[1]) || u.user.id == msg.author.id), user = member.user;

            let _ = new Discord.MessageEmbed({
                color: "YELLOW",
                title: "User Statistics",
                description: `These are all the user statistics I could find for ${user.tag} (${user.id})`,
                fields: [
                    {
                        name: "User Tag",
                        value: user.tag,
                        inline: true
                    },
                    {
                        name: 'Nickname',
                        value: member.displayName,
                        inline: true
                    },
                    {
                        name: 'ID',
                        value: user.id,
                        inline: true
                    },
                    {
                        name: 'Joined at',
                        value: member.joinedAt,
                        inline: true
                    },
                    {
                        name: 'Created at',
                        value: user.createdAt,
                        inline: true
                    },
                    {
                        name: 'Permissions',
                        value: member.permissions.bitfield,
                        inline: true
                    },
                    {
                        name: 'Account Type',
                        value: (user.bot) ? 'Bot' : (user.system) ? 'System' : 'Normal',
                        inline: true
                    },
                    {
                        name: 'Status',
                        value: user.presence.clientStatus
                            ? user.presence.clientStatus.mobile
                                ? `[MOBILE] ${user.presence.status}`
                                : user.presence.clientStatus.web
                                    ? `[WEB] ${user.presence.status}`
                                    : user.presence.clientStatus.desktop
                                        ? `[DESKTOP] ${user.presence.status}`
                                        : user.presence.status
                            : 'Offline',
                        inline: true
                    },
                    {
                        name: 'Badges',
                        value: `${user.flags ? [
                            user.flags.has(Discord.UserFlags.FLAGS.DISCORD_EMPLOYEE)
                                ? '<:stafftools:799349935224258600>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.EARLY_SUPPORTER)
                                ? '<:supporter:799348812803342407>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.EARLY_VERIFIED_BOT_DEVELOPER)
                                ? '<:early_verified_dev:799325612669009990>' : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.PARTNERED_SERVER_OWNER)
                                ? '<:discord_partner:799348216431771720>' :
                                undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BALANCE)
                                ? '<:hype_balance:799318532407689244>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRAVERY)
                                ? '<:hype_brave:799318595782967307>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRILLIANCE)
                                ? '<:hype_brill:799325528960139294>'
                                : undefined
                        ].join(" ") ? [
                            user.flags.has(Discord.UserFlags.FLAGS.DISCORD_EMPLOYEE)
                                ? '<:stafftools:799349935224258600>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.EARLY_SUPPORTER)
                                ? '<:supporter:799348812803342407>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.EARLY_VERIFIED_BOT_DEVELOPER)
                                ? '<:early_verified_dev:799325612669009990>' : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.PARTNERED_SERVER_OWNER)
                                ? '<:discord_partner:799348216431771720>' :
                                undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BALANCE)
                                ? '<:hype_balance:799318532407689244>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRAVERY)
                                ? '<:hype_brave:799318595782967307>'
                                : undefined,
                            user.flags.has(Discord.UserFlags.FLAGS.HOUSE_BRILLIANCE)
                                ? '<:hype_brill:799325528960139294>'
                                : undefined
                        ].join(" ") : "None" : "None"}`.replace(/,/g, '\n'),
                        inline: true
                    }
                ],
                thumbnail: {
                    url: user.avatarURL(),
                }
            });
            msg.channel.send(_);
            msg.react('✅');
        } catch (e) { msg.reply(err.find(`${e}`)); }
    }
};
