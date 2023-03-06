
import redis from "redis";
import session from "express-session";
import RedisStore from 'connect-redis';
import logger from "../utils/winston.js";

export const client = redis.createClient({ legacyMode: true, });

export const RedisStoreSession = RedisStore(session);

export const redisConnect = () => {
    try {
        client.connect()
        logger.log('info', "✅ Redis ON")

    } catch (error) {
        throw logger.log('error', `❌ Can not connect to Redis! ${e}`)
    }
};