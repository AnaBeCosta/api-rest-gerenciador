const express = require('express');
const route = express.Router();
const controllerPessoa = require("../controllers/controllerPessoa");
const controllerProjeto = require("../controllers/controllerProjeto");


module.exports = route;

//LOGIN
route.post("/login", controllerPessoa.postLogin);

//ADMINISTRADOR
route.post("/cadastrarPessoa", controllerPessoa.postCadastrarPessoa);

route.put("/editarPessoa", controllerPessoa.putEditarPessoa);

route.delete("/pessoa/:_id", controllerPessoa.deletePessoa);

route.get("/candidatos", controllerPessoa.getCandidatos);

//RESPONSAVEL
route.post("/cadastrarProjeto", controllerProjeto.postCadastrarProjeto);

route.put("/editarProjeto", controllerProjeto.putEditarProjeto);

route.delete("/projeto/:_id", controllerProjeto.deleteProjeto);

route.get("/projetos", controllerProjeto.getProjetos);

//CANDIDATOS E USUARIO
route.get("/cadidatosInteressados", controllerProjeto.getCandidatosInteressados);

route.post('/candidatar', controllerProjeto.postCandidatar);

route.get("/selecionados", controllerProjeto.getCandidatosSelecionados);

route.post('/selecionarCandidato', controllerProjeto.postSelecionarCandidato);

