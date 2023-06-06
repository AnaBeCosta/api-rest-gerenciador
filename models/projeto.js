const mongoose = require('mongoose');
const Pessoa = require('./pessoa');

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
  responsavel: {      
    type: String,
    required: true,
    unique:true,
  },
  candidatos: { 
    type: Array, 
    "default": [] 
  },
  selecionados: { 
    type: Array, 
    "default": [] 
  },
});

module.exports = mongoose.model('Projeto', Projeto);