import dotenv from 'dotenv';
import mongoose from "mongoose";
import logger from '../utils/winston.js';
dotenv.config();

const mongoURL = process.env.MONGODB_URL

export class MongoConnectSingleton {
    static instance = null;

    constructor() {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURL)
            .then(() => logger.log('info', "✅ DB ON"))
            .catch(e => logger.log('error', ` ❌ DB OFF ${e}`));
    }
    static getInstance() {
        if (!MongoConnectSingleton.instance) {
            MongoConnectSingleton.instance = new MongoConnectSingleton();
        }
        return MongoConnectSingleton.instance;
    }
}