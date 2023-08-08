let { bookIdentifier, books } = require('../database/library');
const conferLibrary = (req, res) => {
    return res.json(books);
}

const findBookById = (req, res) => {
    const { id } = req.params;
    const book = books.find((book) => {
        return book.id === Number(id)
    });

    if (!book && id > 0) {
        return res.status(404).json({ mensagem: 'Não existe livro para o ID informado.' });
    }

    if (!Number.isInteger(id) && id <= 0) {
        return res.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    }

    return res.status(200).json(book);
}

const addBook = (req, res) => {
    const { titulo, autor, ano, numPaginas } = req.body;
    const arrayDataBook = [titulo, autor, ano, numPaginas.toString()];

    if ((arrayDataBook.some((dado) => {
        return dado === undefined;
    }))) {
        return res.status(400).json({ mensagem: 'Complete todas as informações' });
    }
    if (arrayDataBook.some((dado) => {
        const dadoTratado = dado.split(' ').join('');
        return dadoTratado === "";
    })) {
        return res.status(400).json({ mensagem: 'Preencha com informações válidas' });
    }

    const book = {
        id: bookIdentifier++,
        titulo,
        autor,
        ano,
        numPaginas
    }
    books.push(book);
    return res.status(201).json(book);
};

const replaceBook = (req, res) => {
    const { id } = req.params;
    const switchBook = books.find((book) => {
        return book.id === Number(id)
    });
    const { titulo, autor, ano, numPaginas } = req.body;

    if (!switchBook) {
        return res.status(404).json({ mensagem: 'Não existe livro a ser substituído para o ID informado.' });
    }

    const newbook = {
        id,
        titulo,
        autor,
        ano,
        numPaginas
    }
    books.splice(id, 1, newbook);
    return res.status(200).json({ mensagem: "Livro substituído." });
};

const updateBoook = (req, res) => {
    const { id } = req.params;
    const outdatedBook = books.find((book) => {
        return book.id === Number(id)
    });
    const { titulo, autor, ano, numPaginas } = req.body;
    let updated = false;

    if (!outdatedBook) {
        return res.status(404).json({ mensagem: 'Não existe livro a ser alterado para o ID informado.' });
    }

    if (titulo) {
        outdatedBook.titulo = titulo;
        updated = true;
    }
    if (autor) {
        outdatedBook.autor = autor;
        updated = true;
    }
    if (ano) {
        outdatedBook.ano = ano;
        updated = true;
    }
    if (numPaginas) {
        outdatedBook.numPaginas = numPaginas;
        updated = true;
    }

    if (updated) {
        return res.status(200).json({ mensagem: "Livro alterado." });
    }
};

const removeBook = (req, res) => {
    const { id } = req.params;
    const book = books.find((book) => {
        return book.id === Number(id)
    });

    if (!book) {
        return res.status(404).json({ mensagem: 'Não existe livro a ser removido para o ID informado.' });
    }

    books.splice((id - 1), 1);
    return res.status(200).json({ mensagem: 'Livro removido.' });
}

module.exports = {
    conferLibrary,
    findBookById,
    addBook,
    replaceBook,
    updateBoook,
    removeBook
}