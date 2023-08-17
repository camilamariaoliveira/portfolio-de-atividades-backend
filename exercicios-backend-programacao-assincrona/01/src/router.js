const express = require('express');
const { getProducts, findProductById, calculateShipping } = require('./controller/controller');

const rotes = express();

rotes.get('/produtos', getProducts);
rotes.get('/produtos/:idProduto', findProductById);
rotes.get('/produtos/:idProduto/frete/:cep', calculateShipping);

module.exports = rotes;