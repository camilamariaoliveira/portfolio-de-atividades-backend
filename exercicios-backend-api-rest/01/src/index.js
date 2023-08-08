const express = require('express');
const intermediarios = require('./intermediarios');
const rotes = require('./roteador');

const app = express();

app.use(express.json());
app.use(intermediarios.validarSenha);
app.use(rotes);

app.listen(3000);