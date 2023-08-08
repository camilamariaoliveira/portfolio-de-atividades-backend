const express = require('express');
const { conferLibrary, findBookById, addBook, replaceBook, updateBoook, removeBook } = require('./controller/library');

const rotes = express();

rotes.get('/livros', conferLibrary);
rotes.get('/:id', findBookById);
rotes.post('/livros', addBook);
rotes.put('/livros/:id', replaceBook);
rotes.patch('/livros/:id', updateBoook);
rotes.delete('/livros/:id', removeBook);

module.exports = rotes;