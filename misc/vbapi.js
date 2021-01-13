// The Void Bots API Wrapper I made.

const fetch = require('node-fetch');

exports.voted = async (botid, id) =>
(await (await fetch(`https://voidbots.net/api/auth/voted/${botid}`, {
    headers: {
        "voter": id
    }
})).json());

// eslint-disable-next-line no-undef
/**
 * 
 * @param {string} botid 
 * @param {string} auth 
 */
exports.reviews = async (botid, auth = process.env.VB_AUTH_TOKEN_EUREKA) => (await (await fetch(`https://api.voidbots.net/bot/reviews/${botid}`, {
    headers: {
        Authorization: auth
    }
})).json()).reviews?.map(v => ({ author: v.userid, rating: `${v.rating == '5' ? '<:starsolid:788979516080128030>'.repeat(5) : '<:starsolid:788979516080128030>'.repeat(parseInt(v.rating)) + '<:star_empty:788979104565035028>'.repeat(5 - parseInt(v.rating))}`, text: v.message, response: v.responses[0] }));

