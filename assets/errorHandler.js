const Discord = require('discord.js');

module.exports.errors = {
    "0": {
        name: 'No Arguments',
        id: 'E:NOARGS',
        text: 'No arguments were provided for the given command, therefore the parser could not execute it.'
    },
    "1": {
        name: 'Insufficient Arguments',
        id: 'E:NOTENOUGHARGS',
        text: 'An argument for !!{name}!! was not provided for the given command, therefore the parser could not execute it.'
    },
    "2": {
        name: 'No Handler Found for the Given Action',
        id: 'ESILENT:NOHANDLER',
        text: 'No event handler could be found for the given action.'
    },
    "9999": {
        name: 'Unsupported Operation | Error',
        id: 'EDEV:NOHANDLER|ERROROPERATOR',
        text: 'An unexpected error occurred in the !!{pid}!! process.'
    },
    "f": {
       name:"An Unexpected Error Occurred",
       id:"E:UNEXPECTEDERR",
       text: "!!{text}!!" 
    }
};
/**
 * @param {number} id
 * @param {(err:object)=>any|void} callback 
 * @param {{silent?:boolean,pid?:string|number,arg?:string,embed?:boolean}} options 
 */
module.exports.handler = function (id, callback, options)
{
    callback ? callback(this[id]) : null;
    /**
     * @type {{name:string,id:string,text:string}}
     */
    const err = this.errors[id];
    return options?.embed ? new Discord.MessageEmbed({
        title: err.name,
        description: err.text.replace(/!!{pid}!!/g, options.pid ? options.pid : 'main').replace(/!!{name}!!/g, options.arg ? options.arg : 'null').replace(/!!{text}!!/g, options.text ? options.text : "No error provided."),
        footer: {
            text: err.id
        },
        color: '#e34c22',
        image: {
            url: 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
        }
    }) : this.errors[id];
    //return options?.embed ? new Discord.MessageEmbed
};

module.exports.find = function (e) { return this.handler("f", null, { text: e, embed: true }) }
