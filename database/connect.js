const mongoose = require('mongoose');

// Conectando ao banco de dados
function connectToDatabase(){
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
}

module.exports = connectToDatabase;
