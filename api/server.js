const app = require('./app');

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`)
});
