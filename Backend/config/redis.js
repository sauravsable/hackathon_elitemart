const cache = require('express-redis-cache');
const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

const redisCache = cache({
    client: redisClient,
    prefix: 'elitemart',
    expire: 60, 
});

module.exports = redisCache;
