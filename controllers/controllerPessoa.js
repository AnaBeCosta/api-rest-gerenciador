const Pessoa =  require("../models/pessoa");
module.exports = {
  
  //PESSOAS
    async getPessoas(req, res) {
      let pessoas = await Pessoa.find();
      return res.json({ "data":{"status":"success",pessoas}});
    },

    async postCadastrarPessoa(req, res) {
        const { nome, cpf, email, idade, admin, responsavel, candidato, senha } = req.body;
        const pessoa = new Pessoa({ nome, cpf, email, idade, admin, responsavel, candidato, senha});
        await pessoa.save().then((pessoa) => {
            return res.json({"data": {"status": "success", pessoa}})
        })
    },

    async putEditarPessoa(req, res) {
      const { nome, cpf, email, idade, admin, responsavel, candidato, senha } = req.body;
      const update = { nome, cpf, email, idade, admin, responsavel, candidato, senha};
       
      try {
        await Pessoa.updateOne({ cpf: cpf }, update);
        res.status(200).json({ message: 'Pessoa atualizada com sucesso!' });
      } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar pessoa.' });
      }
    },

    async deletePessoa(req, res){
      const { cpf } = req.params;
    
      try {
        await Pessoa.deleteOne({ cpf: cpf });
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