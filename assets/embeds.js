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
            title: 'No Arguments',
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
    pong: (bot, msgLatency) =>
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
                }
            ],
            timestamp: Date.now()
        });
    },
    eval: (raw, evalOutput) =>
    {
        return new Discord.MessageEmbed({
            title: "UtilityBot Evaluation",
            color: "black",
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
        noLogChan: () =>
        {
            return new Discord.MessageEmbed({
                title: 'No #logs Channel',
                description: 'In order for the logging module of this bot to work, a #logs channel must be created. As of now, there is now way for me to create one for you.',
                timestamp: Date.now()
            });
        }
    }
};