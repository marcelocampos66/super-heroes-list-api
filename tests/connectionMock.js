const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const getConnection = async () => {
  const DBServer = await MongoMemoryServer.create();
  const URLMock = DBServer.getUri();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  return MongoClient.connect(URLMock, OPTIONS)
};

module.exports = getConnection;
