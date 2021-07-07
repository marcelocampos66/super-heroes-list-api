const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT;

const shlRouter = require('./routes/shlRouter');

const app = express();
app.use(bodyParser.json());

app.use('/heroes', shlRouter); 

app.use((err, _req, res, _next) => {
  return res.status(500).json({ message: err.message });
}); //middleware internal server error

app.listen(PORT, () => { console.log(`Online na porta ${PORT}`) });
