require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.ATLAS_MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
