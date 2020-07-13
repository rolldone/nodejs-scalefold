
const Env = require('dotenv').config().parsed;
const Redis = require("redis");
const NodeRedisPubSub = require('node-redis-pubsub');

const redisPub = Redis.createClient({
  port: Env.REDIS_PORT,
  host: Env.REDIS_HOST,
  auth: Env.REDIS_AUTH,
  no_ready_check: true
});
redisPub.auth(Env.REDIS_AUTH);
const redisSub = Redis.createClient({
  port: Env.REDIS_PORT,
  host: Env.REDIS_HOST,
  auth: Env.REDIS_AUTH,
  no_ready_check: true
});
redisSub.auth(Env.REDIS_AUTH);
let nrpConfig = {
  emitter: redisPub,
  receiver: redisSub
};
module.exports = new NodeRedisPubSub(nrpConfig);