const Pessoa =  require("../models/pessoa");
module.exports = {
    
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
        let pessoa = await Pessoa.findOne({cpf});
        await Pessoa.updateOne(pessoa, update);
    }
}