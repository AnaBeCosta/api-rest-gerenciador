const mongoose = require('mongoose');

const PessoaSchema = new mongoose.Schema({
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
  senha: {
    type: String,
    required: true,
  },
});

module.exports = PessoaSchema;