// The Void Bots API Wrapper I made.

const fetch = require('node-fetch');

module.exports.voted = async (botid, id) =>
    ((await fetch(`https://voidbots.net/api/auth/voted/${botid}`, {
        headers: {
            "voter": id
        }
    })).json())

