const express = require('express');
const route = express.Router();
const controllerPessoa = require("../controllers/controllerPessoa");

module.exports = route;

//ADMINISTRADOR
route.post("/cadastrarPessoa", controllerPessoa.postCadastrarPessoa);

route.put("/editarPessoa", controllerPessoa.putEditarPessoa);

route.delete('/pessoa/:cpf', controllerPessoa.deletePessoa);

route.get("/pessoas", controllerPessoa.getPessoas);

route.get("/candidatos", controllerPessoa.getCandidatos);

//ADMINISTRADOR
