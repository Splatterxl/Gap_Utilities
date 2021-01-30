/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
let embeds = require('../misc/embeds');
const request = require('request'),
    fetch = require('node-fetch');

module.exports = {
    help: {
        "name": ">dict",
        "id": "dict",
        "aliases": [
            "define",
            "dictionary"
        ],
        "desc": "Define a word. Accepts a `--lang` flag-option.",
        "example": ">dict Hello --lang en-US",
        "category": "utility",
        "whitelisted": false,
        voteLocked: false
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args, db, flags, ctx) =>
    {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/${flags._obj.options?.lang ?? "en-US"}/${encodeURIComponent(args[1])}`).then(res => res.json()).then(async body => {
              console.log(body)
              ctx.util.paginate([
                new Discord.MessageEmbed({
                  title: `Definitions for ${body.word}`,
                  description: `**Phonetics**: ${body.phonetics?.map(v => `\`${v.text}\``).join(" | ")}\n**Meanings found**: ${body.meanings?.length}\n**Parts of speech**: ${body.meanings?.map(v => v.partOfSpeech)?.map(v => `\`${v}\``).join(" | ")}`
                }),
                ...(body.meanings?.map((v, i, a) => new Discord.MessageEmbed().setTitle(`Definitions for ${body.word}`).setDescription(`**Part of speech**: ${v.partOfSpeech}\n**Definitions:**\n${v.definitons?.map(v => `  **Definition**: ${v.definiton}\n  **Example**: ${v.example}`)}`).join("\n")) ?? [ ctx.util.embeds.neutralEmbed("Nothing here UwU", false) ])
              ], ctx)
            });
    }
};
