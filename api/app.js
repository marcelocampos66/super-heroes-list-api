require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const client = require('../models/mongoConnection');
const errorMiddleware = require('../middlewares/errorMiddleware');
const shlRouter = require('../routes/shlRouter');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));

client.connect();

app.use('/heroes', shlRouter); 

app.use(errorMiddleware);

module.exports = app;
