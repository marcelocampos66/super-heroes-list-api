require('dotenv').config();
const { MongoClient } = require('mongodb');

const URI = process.env.ATLAS_MONGO_URI;

// const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
// module.exports = client;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connection = () => {
return MongoClient.connect(URI, OPTIONS)
  .then((conn) => conn.db('projects'))
  .catch((err) => {
    console.error(err);
    process.exit();
});
}

module.exports = connection;
