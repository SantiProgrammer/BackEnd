<<<<<<< HEAD
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

=======
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

>>>>>>> 77d518a61b20cd012fe6af822a54be172161d22b
}