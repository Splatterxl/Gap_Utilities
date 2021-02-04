/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = require('discord.js');
require('dotenv').config();
const firebase = require('firebase'),
  chalk = require('chalk'),
  Enmap = require('enmap');
let settings = require('./settings.json');
const CatLoggr = require('cat-loggr');
new CatLoggr({
  shardId: 0,
  shardLength: 1,
}).setGlobal();
console.debug(`Initialising Firebase App...`);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDfUOE2_0S46m5XGEcR5LV8JlK08BDSNgE',
  authDomain: 'eureka-discordjs.firebaseapp.com',
  databaseURL: 'https://eureka-discordjs-default-rtdb.firebaseio.com',
  projectId: 'eureka-discordjs',
  storageBucket: 'eureka-discordjs.appspot.com',
  messagingSenderId: '388372676034',
  appId: '1:388372676034:web:deee0b1ca93b9e7ca8ea5b',
  measurementId: 'G-RPP39NJF8V',
};
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
let firebaseDb = firebase.default.database();
firebaseDb.goOnline();
console.info('Finished initialising Firebase App.');

console.debug('Starting Enmap Instance...');

class Database extends Enmap {
  constructor(name) {
    super({ name });
  }
  ref(id) {
    throw new Error('Deprecated: Why tf are you still using firebase');
  }
  set(key, val, path) {
    return super.set(
      key.split(/\./g)[0],
      val,
      (path ?? key.split(/\./g).slice(1).join('.')) || undefined
    );
  }
  get(key, path) {
    return super.get(
      key.split(/\./g)[0],
      (path ?? key.split(/\./g).slice(1).join('.')) || undefined
    );
  }
  delete(key, path) {
    return super.delete(
      key.split(/\./g)[0],
      (path ?? key.split(/\./g).slice(1).join('.')) || undefined
    );
  }
}

let db = new Database('misc');
if (!db.get('settings')) db.set('settings', {});
if (!db.get('reminders')) db.set('reminders', {});
if (!db.get('gai')) db.set('gai', {});
if (!db.get('afk')) db.set('afk', {});
if (!db.get('blacklist')) db.set('blacklist', {});

let bot = new Discord.Client({
  presence: {
    status: 'online',
    activity: {
      name: 'my system load...',
      type: 'LISTENING',
    },
  },
  partials: ['GUILD_MEMBER', 'MESSAGE', 'CHANNEL', 'REACTION'],
  ws: {
    properties: {
      $browser: 'Discord Android',
      $device: 'X3-KC, X3-KC', // in my enviroment
      $os: 'Android',
    },
  },
  restTimeOffset: 60,
});
bot.responses = new Discord.Collection();
const embeds = require('./misc/embeds');
// @ts-ignore
global.bot = bot;
/**
 * @type {Discord.Message[]}
 */
// @ts-ignore
global.snipes = new Discord.Collection();

let events = new Discord.Collection();

{
  events.set('message', require('./events/message.event'));
  events.set('ready', require('./events/ready.event'));

  events.set('guildMemberAdd', require('./events/guildMemberAdd.event'));
  console.info('[STARTUP] Loaded events.');
}

{
  bot.on('ready', () => events.get('ready').run(bot, db));
  bot.on('message', m => events.get('message').run(bot, m, db));
  bot.on('channelCreate', c => events.get('channelCreate')?.run(bot, c, db));
  bot.on('channelDelete', c => events.get('channelDelete')?.run(bot, c, db));
  bot.on('messageDelete', m => events.get('messageDelete')?.run(bot, m, db));
  bot.on('messageUpdate', async (o, n) => {
    if (o.content !== n.content)
      bot.emit('message', await o.channel.messages.fetch(n.id));
  });
  bot.on('guildCreate', async g => {
    settings.settings[g.id] = settings.settings.default;
    db.set(`settings.${g.id}`, settings.settings.default);
    g.channels.cache
      .find(c => c.name == 'general')
      ?.send(embeds.newGuild())
      .catch(e => null);
    bot.channels.fetch('800804128938131507').then(async v =>
      v.send(
        new Discord.MessageEmbed({
          title: `Guild Joined - ${g.name}`,
          description: `__**ID:**__ ${g.id}\n__**Owned by:**__ ${
            (await g.members.fetch(g.ownerID)).user.tag
          } (${g.ownerID})\n__**Member Count:**__ ${g.memberCount}`,
          thumbnail: {
            url: g.iconURL({
              dynamic: true,
            }),
          },
          color: 'GREEN',
        })
      )
    );
  });
  bot.on('guildDelete', async g => {
    bot.channels.fetch('800804128938131507').then(async v =>
      v.send(
        new Discord.MessageEmbed({
          title: `Guild Left - ${g.name}`,
          description: `__**ID:**__ ${g.id}\n__**Owned by:**__ ${
            (await g.members.fetch(g.ownerID)).user.tag
          } (${g.ownerID})\n__**Member Count:**__ ${g.memberCount}`,
          thumbnail: {
            url: g.iconURL({
              dynamic: true,
            }),
          },
          color: 'RED',
        })
      )
    );
  });
  bot.on('messageUpdate', async (o, n) => {
    if (o.content !== n.content && n.content)
      global.snipes.set(o.channel.id, {
        oldContent: o.content,
        ...((await n.fetch?.()) ?? n),
      });
  });
  bot.on('messageDelete', m => global.snipes.set(m.channel.id, m));
  global.snipes.set('e', true);
  bot.on('debug', e => console.log(chalk`{yellow DEBUG} ${e}`));
  bot.on('guildMemberAdd', m => events.get('guildMemberAdd').run(m, db, bot));
}

bot.login(require('./token')).then(() => (global.timestamp = Date.now()));
