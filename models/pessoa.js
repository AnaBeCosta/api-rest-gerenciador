const mongoose = require('mongoose');

const Pessoa = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  responsavel: {
    type: Boolean,
    required: true,
  },
  candidato: {
    type: Boolean,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Pessoa', Pessoa);