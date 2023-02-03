const mongoose = require("mongoose");

const mongoConect = async () => {
    return mongoose
        .connect("mongodb+srv://santiagomorera:NBLW114i2jvyU60F@cluster0.1clmwkn.mongodb.net/ecommerce")
        .then(() => console.log("\x1b[32m", "Connected to Mongo ✅"))
        .catch((e) => {
            console.error(e);
            throw "can not connect to the mongo! ❌";
        });
}

module.exports = mongoConect
