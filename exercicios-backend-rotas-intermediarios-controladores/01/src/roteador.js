const express = require('express');
const { somar, subtrair, multiplicar, dividir } = require('./controller/calculator');

const rotes = express();

rotes.get('/somar', somar);
rotes.get('/subtrair', subtrair);
rotes.get('/multiplicar', multiplicar);
rotes.get('/dividir', dividir);

module.exports = rotes;