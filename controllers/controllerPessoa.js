const Pessoa =  require("../models/pessoa");
module.exports = {
    
    async getPessoas(req, res) {
    let pessoas = await Pessoa.find();
    return res.json({ "data":{"status":"success",pessoas}});
    },

    async postPessoa(req, res) {
        const { nome, cpf, email, idade, admin, responsavel, candidato, senha } = req.body;
        const pessoa = new Pessoa({ nome, cpf, email, idade, admin, responsavel, candidato, senha})
        await pessoa.save().then((pessoa) => {
            return res.json({"data": {"status": "success", pessoa}})
        })
    }
}