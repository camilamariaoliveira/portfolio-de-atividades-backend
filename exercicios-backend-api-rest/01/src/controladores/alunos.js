let { alunos, identificadorAlunos } = require('../dados/alunos');

const listarAlunos = (req, res) => {
    return res.json(alunos);
};
const detalharAlunos = (req, res) => {
    const { id } = req.params;
    const aluno = alunos.find((aluno) => {
        return aluno.id === Number(id)
    });

    if (!aluno && id > 0) {
        return res.status(404).json({ mensagem: 'O aluno não foi encontrado.' });
    }

    if (!Number.isInteger(id) && id <= 0) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número válido.' });
    }

    return res.status(200).json(aluno);
};

const cadastrarAluno = (req, res) => {
    const { nome, sobrenome, idade, curso } = req.body;
    const arrayDadosAluno = [nome, sobrenome, idade.toString(), curso];

    if ((arrayDadosAluno.some((dado) => {
        return dado === undefined;
    }))) {
        return res.status(400).json({ mensagem: 'Complete todas as informações' });
    }
    if (arrayDadosAluno.some((dado) => {
        const dadoTratado = dado.split(' ').join('');
        return dadoTratado === "";
    })) {
        return res.status(400).json({ mensagem: 'Preencha com informações válidas' });
    }
    if (idade < 18) {
        return res.status(400).json({ mensagem: 'Apenas alunos com 18 anos ou mais, são permitidos!' });
    }
    const aluno = {
        id: identificadorAlunos++,
        nome,
        sobrenome,
        idade,
        curso
    }
    alunos.push(aluno);
    return res.status(201).json(aluno);
};

const excluirAluno = (req, res) => {
    const { id } = req.params;
    const aluno = alunos.find((aluno) => {
        return aluno.id === Number(id)
    });

    if (!aluno && id > 0) {
        return res.status(404).json({ mensagem: 'O aluno a ser excluído não foi encontrado.' });
    }

    if (!Number.isInteger(id) && id <= 0) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número válido.' });
    }

    alunos = alunos.filter((aluno) => {
        return aluno.id !== Number(id);
    })
    return res.status(200).json(aluno);
}

module.exports = {
    listarAlunos,
    detalharAlunos,
    cadastrarAluno,
    excluirAluno
}