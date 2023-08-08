const express = require('express');
const { yourTurn, confer, remove, add } = require('./controller/rounds');

const rotes = express();

rotes.get("/", yourTurn)
rotes.get("/consultar", confer)
rotes.get("/remover", remove)
rotes.get("/adicionar", add)

module.exports = rotes;