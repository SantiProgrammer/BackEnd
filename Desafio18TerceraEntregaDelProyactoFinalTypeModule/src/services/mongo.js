import mongoose from "mongoose";
import wLogger from "../utils/winston.js";

const mongoConnect = async () => {
    try {
        return mongoose.set('strictQuery', false)
            .connect("mongodb+srv://santiagomorera:NBLW114i2jvyU60F@cluster0.1clmwkn.mongodb.net/ecommerce")
            .then(() => wLogger.log('info', "✅ Connected to Mongo"))
            .catch((e) => {
                throw wLogger.log('error', `can not connect to the mongo! ❌ ${e}`);
            });

    } catch (e) {
        wLogger.log('error', e)
    }
}

export default mongoConnect;

