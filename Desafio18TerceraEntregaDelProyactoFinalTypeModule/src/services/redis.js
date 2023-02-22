/* esto no esta conectado con el server */

const client = redis.createClient({ legacyMode: true, });

const redisConnect = () => {
    try {
        return client
            .connect()
            .then(() => wLogger.log('info', "Connected to REDIS ✅"))
            .catch((e) => {
                throw wLogger.log('error', `Can not connect to Redis! ❌ ${e}`);
            });

    } catch (e) {
        wLogger.log('error', `Can not connect to Redis! ❌❌ ${e}`);
    }

}