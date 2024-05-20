const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = `mongodb://${process.env.DB_SERVER}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

async function main() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });        
        console.log('conectou a db');        
    } catch (error) {
        console.log(error);
    }
}
main();

module.exports = main;