const { MongoClient } = require('mongodb');

const uri = process.env.ATLAS_MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("projects").collection("heroes");
  client.close();
});

module.exports = client;
