const express = require('express');
const route = express.Router();
const controllerPessoa = require("../controllers/controllerPessoa");
const controllerProjeto = require("../controllers/controllerProjeto");
const controllerParticipa = require('../controllers/controllerParticipa');

module.exports = route;

//ADMINISTRADOR
route.post("/cadastrarPessoa", controllerPessoa.postCadastrarPessoa);

route.put("/editarPessoa", controllerPessoa.putEditarPessoa);

route.delete('/pessoa/:cpf', controllerPessoa.deletePessoa);

route.get("/pessoas", controllerPessoa.getPessoas);

route.get("/candidatos", controllerPessoa.getCandidatos);

//RESPONSAVEL
route.post("/cadastrarProjeto", controllerProjeto.postCadastrarProjeto);

route.put("/editarProjeto", controllerProjeto.putEditarProjeto);

route.delete("/projeto/:cpf", controllerProjeto.deleteProjeto);

route.get("/projetos", controllerProjeto.getProjetos);

route.post("/selecionarCandidato", controllerParticipa.postSelecionaCandidato);

route.get("/participa", controllerParticipa.getParticipa);

route.post("/cadastrarParticipante", controllerParticipa.postCadastrarParticipante);
