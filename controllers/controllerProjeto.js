const Projeto =  require("../models/projeto");
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
  }
}