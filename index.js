const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3001;

const app = express();

app.use(bodyParser.json());

// Rotas

// 

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
}); //middleware error

app.listen(PORT, () => { console.log(`Rodando na porta ${PORT}`) });
