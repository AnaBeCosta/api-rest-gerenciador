const Pessoa =  require("../models/pessoa");
const Projeto =  require("../models/projeto");
const jwt = require('jsonwebtoken');
const secretKey = 'JuliAna';

//VERIFICA TOKEN
function verificaToken(req, res){
  const token = req.headers['x-access-token'];
  jwt.verify(token, secretKey, (err, decoded) => {
    if(err) return res.status(401).end();

    req.userId = decoded.userId;
  })
}

module.exports = {
  //LOGIN
  async postLogin (req, res){
    const user = await Pessoa.findOne({cpf: req.body.user, senha:req.body.senha});

    console.log(user);
    
    if(user !== null){
        const token = jwt.sign({userId: req.body.user}, secretKey, {expiresIn: 600});
        return res.json({auth: true, token});
    }
    res.status(401).end();
  },



  //PESSOAS
  async getPessoas(req, res){
    verificaToken(req, res);
    console.log(req.userId + "FEZ a chamada");
    let verificaAdmin = await Pessoa.findOne({cpf: req.userId});

    if(verificaAdmin.admin === true){
      console.log(verificaAdmin.nome + " é um admin");
    }else{
      console.log(verificaAdmin.nome + " não é um admin");
    }
    let pessoas = await Pessoa.find();
    return res.json({ "data":{"status":"success",pessoas}});
  },

  async postCadastrarPessoa(req, res) {
      const { nome, cpf, email, idade, senha, admin } = req.body;
      const pessoa = new Pessoa({nome, cpf, email, idade, senha, admin});
      try {
        await pessoa.save().then(pessoa);
        res.status(200).json({"data": {"status": "success", pessoa}});
      }catch(error){
        res.status(500).json({ error: 'Erro ao cadastrar pessoa.'});
      }
  },

  async putEditarPessoa(req, res) {
    const { nome, cpf, email, idade, senha, admin } = req.body;
    const update = { nome, cpf, email, idade, senha, admin};
      
    try {
      await Pessoa.updateOne({ cpf: cpf }, update);
      res.status(200).json({ message: 'Pessoa atualizada com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar pessoa.' });
    }
  },

  async deletePessoa(req, res){
    const { _id } = req.params;
  
    try {
      await Pessoa.deleteOne({ _id: _id });
      res.status(200).json({ message: 'Pessoa excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro ao excluir a pessoa' });
    }
  },

  //CANDIDATOS
  async getCandidatos(req, res) {
    try {
      const pessoas = await Pessoa.find({ candidato: true });
      return res.json({ data: { status: "success", pessoas } });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar candidatos.' });
    }
  }

}
