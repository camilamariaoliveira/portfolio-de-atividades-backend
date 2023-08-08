const express = require('express');
const { listarAlunos, detalharAlunos, cadastrarAluno, excluirAluno } = require('./controladores/alunos');

const rotes = express();

rotes.get('/alunos', listarAlunos);
rotes.get('/alunos/:id', detalharAlunos);
rotes.post('/alunos', cadastrarAluno);
rotes.delete('/alunos/:id', excluirAluno);

module.exports = rotes;