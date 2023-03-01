import mongoose from "mongoose";
import logger from '../utils/winston.js'
import Productos from "../models/productos.js";

import dotenv from 'dotenv';
dotenv.config();
const mongoURL = process.env.MONGODB_UR

class Database {
    static instance = null;

    constructor() {
        mongoose.set('strictQuery', false)
        mongoose.connect("mongodb+srv://santiagomorera:NBLW114i2jvyU60F@cluster0.1clmwkn.mongodb.net/desafio19")
            .then(() => logger.log('info', "✅ DB ON"))
            .catch(e => logger.log('error', ` ❌ DB OFF ${e}`));
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

Database.getInstance();


export const getStockData = async () => {
    try {
        const stock = await Productos.find({})
        return stock
    } catch (e) {
        logger.log('error', `❌ Error cant get stock data: ${e}`);
    }
};


export const postProductAddData = (data) => {
    try {
        Productos.create(data)
    } catch (e) {
        logger.log('error', `❌ Error adding product data: ${e}`);
    }
};






