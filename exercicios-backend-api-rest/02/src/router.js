const express = require('express');
const { listarConvidados, adicionarConvidados, removerConvidados } = require('./controller/convidados');

const rotes = express();

rotes.get('/convidados', listarConvidados);
rotes.post('/convidados', adicionarConvidados);
rotes.delete('/convidados/:nome', removerConvidados);

module.exports = rotes;