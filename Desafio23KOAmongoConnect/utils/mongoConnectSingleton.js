const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL

const MongoConnect = async () => {

    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURL)
        .then(() => console.log('✅ Success:', "MongoDB Connected!"))
        .catch(e => console.log('❌ Error:', `cant connect to MongoDB: ${e}`));
}




module.exports = MongoConnect;

