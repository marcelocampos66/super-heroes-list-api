const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const client = require('./models/mongoConnection');
const cors = require('cors');


const PORT = process.env.PORT;

const shlRouter = require('./routes/shlRouter');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));

client.connect();

app.use('/heroes', shlRouter); 

app.use((err, _req, res, _next) => {
  // client.close();
  return res.status(500).json({ message: err.message });
}); //middleware internal server error

app.listen(PORT, () => { console.log(`Online na porta ${PORT}`) });
