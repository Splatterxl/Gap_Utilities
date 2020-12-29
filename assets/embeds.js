const Discord = require('discord.js');

module.exports = {
    /**
     * @param {string} example 
     * @param {number} min 
     * @param {{
     *  name: 'Argument Explanation',
     *  value: string,
     *  inline: boolean
     * }} args
     */
    noArgs: (example, min, args) =>
    {
        return new Discord.MessageEmbed({
            title: 'Insufficient Arguments',
            description: `Please add at least ${min} argument${min === 1 ? '' : 's'} to the end of your command.`,
            fields: [
                {
                    name: 'Example',
                    value: `${example}`
                },
                args
            ],
            timestamp: Date.now()
        });
    },
    /**
     * 
     * @param {*} bot 
     * @param {*} msgLatency 
     * @param {firebase.default.database.Database} db 
     */
    pong: async (bot, msgLatency, db) =>
    {
        return new Discord.MessageEmbed({
            title: '🏓 Pong!',
            color: 'red',
            description: 'The bot is online!',
            fields: [
                {
                    name: 'WS Latency',
                    value: `\`\`\`js\n${bot.ws.ping}\`\`\``,
                    inline: true
                },
                {
                    name: 'Edit Latency',
                    value: `\`\`\`js\n${msgLatency}\`\`\``
                },
                {
                    name: 'Database Latency',
                    value: `\`\`\`js\n${await (async () => { let dat = Date.now(); (await db.ref('gai').get()).val(); return Date.now() - day); })()}\`\`\``
                }
            ],
            timestamp: Date.now()
        });
    },
    eval: (raw, evalOutput) =>
    {
        return new Discord.MessageEmbed({
            title: "Eureka! Evaluation",
            color: "yellow",
            description: "Here is your evaluated code.",
            fields: [
                {
                    name: "📥 Input",
                    value: `\`\`\`js\n${raw}\`\`\``
                },
                {
                    name: "📤 Output",
                    value: `\`\`\`js\n${evalOutput}\`\`\``
                }
            ],
            timestamp: Date.now()
        });
    },
    logging: {
        /**
         * 
         * @param {Discord.Client} bot 
         * @param {Discord.Message} o 
         * @param {Discord.PartialMessage} n 
         */
        edit: (bot, o, n) =>
        {
            return new Discord.MessageEmbed({
                title: 'Message Edited',
                description: 'A message was edited in this server.',
                fields: [
                    {
                        name: 'Author',
                        value: `${o.author.tag} (${o.author.id}) (<@${o.author.id}>)`
                    },
                    {
                        name: 'Old Content',
                        value: o.content,
                        inline: true
                    },
                    {
                        name: 'New Content',
                        value: n.content,
                        inline: true
                    },
                    {
                        name: 'Channel',
                        // @ts-ignore
                        value: `<#${o.channel.id}> (#${o.channel.name})`
                    },
                    {
                        name: 'Created',
                        value: JSON.stringify(new Date(o.createdTimestamp)).replace(/\"/, '').replace(/\"/, ''),
                        inline: true
                    },
                    {
                        name: 'Edited',
                        value: JSON.stringify(new Date(n.editedTimestamp)).replace(/\"/, '').replace(/\"/, ''),
                        inline: true
                    }
                ],
                timestamp: Date.now(),
                footer: { text: 'Daniel, I know I copied you, but it\'s my first attempt. Cut me some slack.' }
            });
        },
        channel: {
            /**
             * 
             * @param {Discord.Channel} c 
             */
            create: (c) => new Discord.MessageEmbed({
                title: 'Channel Created',
                description: 'A channel was created in this server.',
                fields: [
                    {
                        name: 'Name',
                        value: `<#${c.id}>`
                    },
                    {
                        name: 'Type',
                        value: c.type
                    },
                    {
                        name: 'ID',
                        value: c.id
                    }
                ]
            }),
            delete: (c) => new Discord.MessageEmbed({
                title: 'Channel Deleted',
                description: 'A channel was deleted in this server.',
                fields: [
                    {
                        name: 'Name',
                        value: `<#${c.id}>`
                    },
                    {
                        name: 'Type',
                        value: c.type
                    },
                    {
                        name: 'ID',
                        value: c.id
                    }
                ]
            })
        },
        noLogChan: async (msg, db) =>
        {
            return new Discord.MessageEmbed({
                title: 'No Logging Channel Specified',
                description: `If you wish for this bot to use its logging module, run \`${(await db.ref(`settings/${msg.guild.id}/prefix`).get()).val()}settings logChan <id_of_channel>\`. You can disable this message by hitting \`${db.ref(`settings/${msg.guild.id}/prefix`)}settings log false\``,
                timestamp: Date.now()
            });
        },
        /**
         * 
         * @param {Discord.Message | Discord.PartialMessage} m 
         */
        delete: (m) => new Discord.MessageEmbed({
            title: 'Message Deleted',
            description: 'A message was deleted in this server.',
            fields: [
                {
                    name: 'Author',
                    value: `${m.author.tag} (${m.author.id}) (<@${m.author.id}>)`
                },
                {
                    name: 'Content',
                    value: m.content
                },
                {
                    name: 'Channel',
                    // @ts-ignore
                    value: `#${m.channel.name} (${m.channel.id}) (<#${m.channel.id}>)`
                },
                {
                    name: 'Created',
                    value: JSON.stringify(new Date(m.createdTimestamp)).replace(/\"+/, ''),
                    inline: true
                },
                {
                    name: 'Deleted',
                    value: JSON.stringify(new Date(Date.now())).replace(/\"+/, ''),
                    inline: true
                }
            ],
            timestamp: Date.now(),
            footer: {
                text: 'I did this on my own lmao'
            }
        })
    },
    unixRes: (stdout, stderr) => new Discord.MessageEmbed()
        .setTitle(`*NIX Command Results`)
        .setColor("yellow")
        .setFooter(`>unix (whitelisted)`)
        .setDescription(`You asked for a *nix command, well, here is your *nix command.`)
        .addField("`stdout`", `\`\`\`\n${stdout}\`\`\``)
        .addField(`\`sterr\``, `\`\`\`\n${stderr}\`\`\``),
    underMaintenance: () => new Discord.MessageEmbed({
        title: 'Under Maintenance',
        description: 'This command is currently broken and under construction. Please try again later.',
        timestamp: Date.now()
    }),
    notWhitelisted: () => new Discord.MessageEmbed({
        title: 'Not Whitelisted',
        description: 'You need to be whitelisted to use this command. As the whitelist is currently being abused, you will need to be the author (<@728342296696979526>).',
        timestamp: Date.now()

    }),
    /**
     * @param {string} permission
     */
    permissionsMissing: (permission) => new Discord.MessageEmbed({
        title: 'Missing Permissions',
        description: `The bot currently does not have the \`${permission.toUpperCase()}\` permission. To use this command, please give it that permission.`,
        timestamp: Date.now(),
        footer: {
            text: 'pls give permissioon lol'
        }
    }),
    /**
     * @param {string} permission
     */
    userPermissionsMissing: (permission) => new Discord.MessageEmbed({
        title: 'Missing Permissions',
        description: `You currently do not have the \`${permission.toUpperCase()}\` permission. To use this command, you need that permission.`,
        timestamp: Date.now(),
        footer: {
            text: 'you\'re not an admin lol'
        }
    }),
    newGuild: () => new Discord.MessageEmbed({
        title: 'OwO whats this >~<',
        description: 'Yay! My first message in this server! I\'ve gone ahead and set some stuff up in the database for you, but you can edit them at the [dashboard](splatterxl.tk/utilitybot) (when i get it working).\n\n**Some useful links:**\n[My Invite](https://splatterxl.page.link/UtilityBot).'
    }),
    /**
     * 
     * @param {Discord.Message} msg 
     */
    afkRemove: (msg) => new Discord.MessageEmbed({
        title: 'AFK Removed',
        description: `Welcome back, <@${msg.author.id}>! I've gone ahead and removed your AFK status for you.`
    }),
    rejected: (r) => new Discord.MessageEmbed({
        title: 'An action was rejected.',
        fields: [
            {
                name: 'Reason',
                value: `\`\`\`js\n${r}\`\`\``
            }
        ]
    }),
    /**
     * 
     * @param {Discord.Message | Discord.PartialMessage} msg
     */
    banned: (msg) => new Discord.MessageEmbed({
        title: 'Banned.',
        description: `<@${msg.content.slice(5)}> has been banned successfully!`,
        timestamp: Date.now()
    }),
    /**
     * 
     * @param {string[]} args 
     */
    blacklistAddJoke: (args) => new Discord.MessageEmbed({
        title: 'Added to the Blacklist.',
        // @ts-ignore
        description: `**${global.bot.users.resolve(args[1]).tag}** will now not be able to use this bot.`
    }),
    blacklisted: () => new Discord.MessageEmbed({
        title: 'You are blacklisted.',
        description: 'You have been blacklisted from using this bot. Please appeal by DMing <@728342296696979526>.'
    }),
    notNSFW: () => new Discord.MessageEmbed({
        title: 'This channel is not NSFW!',
        description: 'This command can only be used in a NSFW channel!'
    }),
    NSFWGifFound: () => new Discord.MessageEmbed({
        title: 'GIF Search',
        description: 'The top search result was NSFW. Please move to a NSFW channel and try again.'
    })
};
