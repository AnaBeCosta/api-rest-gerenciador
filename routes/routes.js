const express = require('express');
const route = express.Router();
const controllerPessoa = require("../controllers/controllerPessoa");

module.exports = route;

route.get("/pessoas", controllerPessoa.getPessoas);

route.post("/pessoa", controllerPessoa.postPessoa);
