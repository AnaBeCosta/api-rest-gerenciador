const mongoose = require('mongoose');
const PessoaSchema = require('./schemas/pessoa');

module.exports = mongoose.model('Pessoa', PessoaSchema);