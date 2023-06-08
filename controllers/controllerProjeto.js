const Projeto =  require("../models/projeto");
const Pessoa = require("../models/pessoa");
const {verificaToken, secretKey} = require("../controllers/controllerPessoa");

//VERIFICA SE É RESPONSAVEL
async function verificaResp(cpfUser, cpfResponsavel) {
  try{
    if(cpfUser === cpfResponsavel){
      console.log("Usuario é o responsavel.");
      return true;
    }else{
      console.log("Usuario não é o responsavel.");
      return false;
    }
  }catch (error) {
    res.status(500).json({ error: 'Erro ao verificar acesso.' });
  }
}

module.exports = {
  async postCadastrarProjeto(req, res) {
    verificaToken(req, res);
    const { nome, descricao, anoInicio, anoTermino, responsavel, candidatos } = req.body;
    const validaResp = await verificaResp(req.userId, responsavel, candidatos);

    try{
      if(validaResp){
        const projeto = new Projeto({ nome, descricao, anoInicio, anoTermino, responsavel });
        await projeto.save();
        return res.json({"data": {"status": "success", projeto}})
      }else{
        res.status(500).json({ error: 'Você não tem permissão! Somente o responsavel do projeto.'});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao cadastrar projeto.' });
    }
  },

  async putEditarProjeto(req, res) {
    verificaToken(req, res);
    const { _id, nome, descricao, anoInicio, anoTermino, responsavel  } = req.body;
    const projeto = await Projeto.findOne({_id: _id });
    const validaResp = await verificaResp(req.userId, projeto.responsavel);

    try {
      if(validaResp){
        const update = { nome, descricao, anoInicio, anoTermino, responsavel };
        await Projeto.updateOne({ _id: _id }, update);
        res.status(200).json({ message: 'Projeto atualizado com sucesso!', update });
      }else{
        res.status(500).json({ error: 'Você não tem permissão! Somente o responsavel do projeto.'});
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar projeto.' });
    }
  },

  async deleteProjeto(req, res){
    verificaToken(req, res);
    const { _id } = req.params;
    const projeto = await Projeto.findOne({_id: _id });
    const validaResp = await verificaResp(req.userId, projeto.responsavel);

    try {
      if(validaResp){
        await Projeto.deleteOne({ _id: _id });
        res.status(200).json({ message: 'Projeto excluído com sucesso' });
      }else{
        res.status(500).json({ error: 'Você não tem permissão! Somente o responsavel do projeto.'});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro ao excluir o projeto' });
    }
  },

  async getProjetos(req, res) {
    try {
      let projetos = await Projeto.find().sort({ candidatos: -1 });
      return res.json({ data: { status: "success", projetos } });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar projetos.' });
    }
  },

  //INTERESSADOS
  async getCandidatosInteressados(req, res) {
    verificaToken(req, res);
  
    try {
      const projeto = await Projeto.findOne({ responsavel: req.userId });
      
      if (projeto) {
        const candidatos = projeto.candidatos;
        return res.json({ data: { status: "success", candidatos } });
      } else {
        res.status(500).json({ error: 'Você não tem projetos cadastrados!' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar candidatos interessados.' });
    }
  },

  //CANDIDATO SE CANDIDATAR
  async postCandidatar(req, res) {
    verificaToken(req, res);
    const {_id} = req.body;
    
    try{
      const projeto = await Projeto.findOne({ _id: _id });
      const candidato = await Pessoa.findOne({cpf: req.userId });
      projeto.candidatos.push(candidato.cpf);
      await projeto.save();
      res.status(200).json({data: {status: "success", projeto}});
    } catch (error) {
      res.status(500).json({ error: 'Erro ao se candidatar.' });
    }
  },

  // SELECIONADOS
  async getCandidatosSelecionados(req, res) {
    const {_id} = req.body;

    try {
      const projeto = await Projeto.findOne({_id: _id});
      const selecionados = projeto.selecionados;
      return res.json({ data: { status: "success", selecionados } });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar candidatos selecionados.' });
    }
  },

  // SELECIONAR CANDIDATOS INTERESSADOS
  async postSelecionarCandidato(req, res) {
    verificaToken(req, res);

    try {   
      const {candidato} = req.body;
      const projeto = await Projeto.findOne({ responsavel: req.userId });
         
      if (projeto) {
        const candidatoSelecionado = projeto.candidatos.find((arrayCandidato) => arrayCandidato === candidato);
        
        if(candidatoSelecionado){
          projeto.candidatos.remove(candidato);
          projeto.selecionados.push(candidato);
          await projeto.save();
          return res.json({ data: { status: "success", candidatoSelecionado, projeto } });
        }else{
          res.status(500).json({ error: 'Candidato não está interessado no projeto. Selecione os interessados !' });
        }
      } else {
        res.status(500).json({ error: 'Você não tem projetos cadastrados!' });
      }
    }catch (error) {
      res.status(500).json({ error: 'Erro ao selecionar candidatos.' });
    }
  }
}