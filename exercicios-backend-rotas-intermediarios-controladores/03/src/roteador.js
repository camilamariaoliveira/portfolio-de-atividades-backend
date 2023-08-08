const express = require('express');
const { get, getPorId } = require('./controladores/imoveis');

const rotes = express();

rotes.get("/imoveis", get);
rotes.get("/imoveis/:id", getPorId);

module.exports = rotes;