const Discord = require('discord.js');
const idify = require("../assets/idify");

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
        "category":"utility"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        try
        {
            
            let user = (await bot.users.fetch(idify(args[1])).catch(e=>null))||bot.users.cache.find(u=>u.username.includes(args[1]))||msg.author;
            let member = (await msg.guild.members.fetch(user.id).catch(e=>null));
            
            let _ = new Discord.MessageEmbed({
                color: "black",
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
                            : 'Cannot Fetch',
                        inline: true
                    },
                    /*{
                        name: 'Badges',
                        value: `${[
                            user.flags.has('DISCORD_EMPLOYEE')
                                ? 'Discord Staff'
                                : undefined,
                            user.flags.has('EARLY_SUPPORTER')
                                ? 'Early Supporter'
                                : undefined,
                            user.flags.has('EARLY_VERIFIED_DEVELOPER')
                                ? 'Early Verified Developer' : undefined,
                            user.flags.has('DISCORD_PARTNER')
                                ? 'Discord Partner' :
                                undefined,
                            user.flags.has('HOUSE_BALANCE')
                                ? 'House of Balance'
                                : undefined,
                            user.flags.has('HOUSE_BRAVERY')
                                ? 'House of Bravery'
                                : undefined,
                            user.flags.has('HOUSE_BRILLIANCE')
                                ? 'House of Brilliance'
                                : undefined
                        ]}`.replace(/\,/g, '\n'),
                        inline: true
                    }*/
                ],
                thumbnail: {
                    url: user.avatarURL(),
                }
            });
            msg.channel.send(_);
            msg.react('✅');
        } catch (e) { msg.reply(`${e}`); }
    }
};
