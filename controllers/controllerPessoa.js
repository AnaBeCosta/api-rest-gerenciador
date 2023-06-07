const Pessoa =  require("../models/pessoa");
const Projeto =  require("../models/projeto");
const jwt = require('jsonwebtoken');
const secretKey = 'JuliAna';

//VERIFICA TOKEN
function verificaToken(req, res){
  try{
    const token = req.headers['x-access-token'];
    jwt.verify(token, secretKey, (err, decoded) => {
      if(err){
        return res.status(401).end();
      }else{
        req.userId = decoded.userId;
      }
    })
  }catch (error) {
    res.status(500).json({ error: 'Erro ao verificar token.' });
  }
}

//VERIFICA SE É ADMIN
async function verificaAdmin(cpf) {
  try{
    const pessoa = await Pessoa.findOne({ cpf: cpf });
    return pessoa ? pessoa.admin : false;
  }catch (error) {
    res.status(500).json({ error: 'Erro ao verificar acesso.' });
  }
}


module.exports = {
  //LOGIN
  async postLogin (req, res){
    try{
      const user = await Pessoa.findOne({cpf: req.body.user, senha:req.body.senha});
      console.log(user);
      
      if(user !== null){
        const token = jwt.sign({userId: req.body.user}, secretKey, {expiresIn: 600});
        return res.json({auth: true, token});
      }else{
        res.status(401).end();
      }
    }catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  },

  //CANDIDATOS
  async postCadastrarPessoa(req, res) {
    verificaToken(req, res);
    const validaAdmin = await verificaAdmin(req.userId);
    const { nome, cpf, email, idade, senha, admin } = req.body;
    const pessoa = new Pessoa({nome, cpf, email, idade, senha, admin});
    
    try {
      if(validaAdmin){
        await pessoa.save().then(pessoa);
        res.status(200).json({"data": {"status": "success", pessoa}});
      }else{
        res.status(500).json({ error: 'Você não tem permissão! Somente administradores.'});
      }
    }catch(error){
      res.status(500).json({ error: 'Erro ao cadastrar pessoa.'});
    }
  },

  async putEditarPessoa(req, res) {
    verificaToken(req, res);
    const validaAdmin = await verificaAdmin(req.userId);
    const { nome, cpf, email, idade, senha, admin } = req.body;
    const update = { nome, cpf, email, idade, senha, admin};
      
    try {
      if(validaAdmin){
        await Pessoa.updateOne({ cpf: cpf }, update);
        res.status(200).json({ message: 'Pessoa atualizada com sucesso!' });
      }else{
        res.status(500).json({ error: 'Você não tem permissão! Somente administradores.'});
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar pessoa.' });
    }
  },

  async deletePessoa(req, res){
    verificaToken(req, res);
    const validaAdmin = await verificaAdmin(req.userId);
    const { _id } = req.params;

    try {
      if(validaAdmin){
        await Pessoa.deleteOne({ _id: _id });
        res.status(200).json({ message: 'Pessoa excluída com sucesso' });
      }else{
        res.status(500).json({ error: 'Você não tem permissão! Somente administradores.'});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro ao excluir a pessoa' });
    }
  },

  async getCandidatos(req, res){
    verificaToken(req, res);
    const validaAdmin = await verificaAdmin(req.userId);
    
    try{
      if(validaAdmin){
        let candidatos = await Pessoa.find();
        return res.json({ data:{status:"success", candidatos}});
      }else{
        res.status(500).json({ error: 'Você não tem permissão! Somente administradores.'});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar pessoas.' });
    }
  }, 

  verificaToken,
  secretKey
}
