const mongoose = require("mongoose");
const wLogger = require("../services/winston");

const mongoConect = async () => {
    return mongoose
        .connect("mongodb+srv://santiagomorera:NBLW114i2jvyU60F@cluster0.1clmwkn.mongodb.net/ecommerce")
        .then(() => wLogger.log('info', "Connected to Mongo ✅"))
        .catch((e) => {
            throw wLogger.log('error', `can not connect to the mongo! ❌ ${e}`);
        });
}

module.exports = mongoConect
