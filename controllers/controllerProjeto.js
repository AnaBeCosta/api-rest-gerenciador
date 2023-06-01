const Projeto =  require("../models/projeto");
const Pessoa = require("../models/pessoa");
module.exports = {
  async postCadastrarProjeto(req, res) {
      try{
          const { nome, descricao, anoInicio, anoTermino, responsavel } = req.body;
          const projeto = new Projeto({ nome, descricao, anoInicio, anoTermino, responsavel });
          await projeto.save();
          return res.json({"data": {"status": "success", projeto}})
      } catch (error) {
        console.log(error);
          return res.status(500).json({ error: 'Erro ao cadastrar projeto.' });
      }
  },

  async putEditarProjeto(req, res) {
      const { nome, descricao, anoInicio, anoTermino, responsavel  } = req.body;
      const update = { nome, descricao, anoInicio, anoTermino, responsavel };
        
      try {
        await Projeto.updateOne({ nome: nome }, update);
        res.status(200).json({ message: 'Projeto atualizado com sucesso!' });
      } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar projeto.' });
      }
  },

  async deleteProjeto(req, res){
      const { nome } = req.params;
    
      try {
        await Projeto.deleteOne({ nome: nome });
        res.status(200).json({ message: 'Projeto excluído com sucesso' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao excluir o projeto' });
      }
  },

  async getProjetos(req, res) {
      try {
        let projetos = await Projeto.find();
        return res.json({ data: { status: "success", projetos } });
      } catch (error) {
        res.status(500).json({ error: 'Erro ao listar projetos.' });
      }
  },

  //INTERESSADOS
  async getCandidatosInteressados(req, res) {
    const { nomeProjeto } = req.body;

    try {
      const projeto = await Projeto.findOne({ nome: nomeProjeto });
      const candidatos = projeto.candidatos.map((candidato) => candidato.candidato);
      return res.json({ data: { status: "success", candidatos } });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar candidatos.' });
    }
  },

  // Selecionados
  async getCandidatosSelecionados(req, res) {
    const {nome} = req.params;
    const projeto = await Projeto.findOne({nome: nome});
    if(projeto == null) {
      res.status(404).json({error: 'Projeto não encontrado'});
    }
    const selecionados = projeto.selecionados.map((selecionado) => selecionado.selecionado);
    res.status(200).json({data: { status: "success", selecionados} });
    },
    // Cadastrar
    async putSelecionarCandidato(req, res) {
      const {cpfResponsavel, cpfCandidato} = req.body;
      
      const projeto = await Projeto.findOne({"responsavel.cpf": cpfResponsavel, });
      const candidato = await Pessoa.findOne({cpf: cpfCandidato});

      projeto.selecionados.push(candidato);
      await projeto.save();
      console.log(candidato);
      res.status(200).json({data: {status: "success", projeto}});
      
    },
    async putCandidatar(req, res) {
      const {nomeProjeto, cpfCandidato} = req.body;
      
      const projeto = await Projeto.findOne({nome: nomeProjeto});
      const candidato = await Pessoa.findOne({cpf: cpfCandidato});
      projeto.candidatos.push(candidato);
      await projeto.save();
      res.status(200).json({data: {status: "success", projeto}});
      
    }
}