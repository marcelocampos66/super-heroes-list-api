require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorMiddleware = require('../middlewares/errorMiddleware');
const shlRouter = require('../routes/shlRouter');
const userRouter = require('../routes/userRouter');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use('/users', userRouter)
app.use('/heroes', shlRouter); 

app.use(errorMiddleware);

module.exports = app;
