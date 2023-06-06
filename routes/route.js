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

route.delete('/pessoa/:_id', controllerPessoa.deletePessoa);

route.get("/candidatos", controllerPessoa.getCandidatos);

//RESPONSAVEL
route.post("/cadastrarProjeto", controllerProjeto.postCadastrarProjeto);

route.put("/editarProjeto", controllerProjeto.putEditarProjeto);

route.delete("/projeto/:nome", controllerProjeto.deleteProjeto);

route.get("/projetos", controllerProjeto.getProjetos);


route.get("/cadidatosInteressados", controllerProjeto.getCandidatosInteressados);

route.get("/selecionados/:nome", controllerProjeto.getCandidatosSelecionados);

route.put('/selecionarCandidato', controllerProjeto.putSelecionarCandidato);

route.put('/candidatar', controllerProjeto.putCandidatar);

