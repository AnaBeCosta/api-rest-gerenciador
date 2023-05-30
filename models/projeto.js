const mongoose = require('mongoose');
const PessoaSchema = require('./schemas/pessoa');

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
  responsavel: {type: PessoaSchema, required: true},
  candidatos: { type: Array, "default": [] },
  selecionados: { type: Array, "default": [] },
});

module.exports = mongoose.model('Projeto', Projeto);