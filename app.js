// server.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes/routes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Conectando ao banco de dados
mongoose.connect('mongodb+srv://adm:UTFPR123@projetos.yu7r5mm.mongodb.net/CCH2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


