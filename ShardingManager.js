/* eslint-disable @typescript-eslint/no-var-requires */
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./main.js', { token: require('./token') });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();
