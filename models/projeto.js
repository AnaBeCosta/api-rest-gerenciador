const mongoose = require('mongoose');

const Projeto = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  anoInicio: {
    type: Number,
    required: true,
  },
  anoTermino: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Projeto', Projeto);