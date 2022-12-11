const {MongoClient} = require('mongodb');
require('dotenv').config();

// console.log("DOTENV -> "+process.env.mongoUri);

const client = new MongoClient(process.env.mongoUri);

module.exports = client;