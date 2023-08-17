const express = require('express');
const { getPokemonsList, findPokemon } = require('./controller/controller');

const rotes = express();

rotes.get('/pokemon', getPokemonsList)
rotes.get('/pokemon/:idOuNome', findPokemon)

module.exports = rotes;