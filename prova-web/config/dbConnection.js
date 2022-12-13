const {MongoClient} = require('mongodb');
require('dotenv').config();

// console.log("DOTENV -> "+process.env.mongoUri);
// const mongo = ('mongoUri = mongodb+srv://root:root@cluster0.dxa1kvh.mongodb.net/?retryWrites=true&w=majority')
const client = new MongoClient("mongodb+srv://root:root@cluster0.dxa1kvh.mongodb.net/?retryWrites=true&w=majority");

module.exports = client;