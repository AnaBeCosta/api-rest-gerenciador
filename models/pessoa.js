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
    senha: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    }
  });

module.exports = mongoose.model('Pessoa', Pessoa);