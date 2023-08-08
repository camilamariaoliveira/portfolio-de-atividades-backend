const convidados = require('../database/convidados');

const listarConvidados = (req, res) => {
    const nome = req.query.nome;

    if (nome && convidados.some((convidado) => {
        return convidado === nome;
    })) {
        return res.json({ mensagem: 'Convidado presente.' });
    }
    if (nome && convidados.every((convidado) => {
        return convidado !== nome;
    })) {
        return res.json({ mensagem: 'O convidado buscado não está presente na lista.' });
    }

    return res.json(convidados);
}

const adicionarConvidados = (req, res) => {
    const nome = req.body.nome;
    if (convidados.some((convidado) => {
        return convidado === nome;
    })) {
        return res.json({ mensagem: 'O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também.' });
    }
    if (convidados.every((convidado) => {
        return convidado !== nome;
    })) {
        convidados.push(nome);
        return res.json({ mensagem: 'Convidado adicionado.' });
    }
}

const removerConvidados = (req, res) => {
    const { nome } = req.params;

    if (convidados.some((convidado) => {
        return convidado === nome;
    })) {
        for (let i = 0; i < convidados.length; i++) {
            if (convidados[i] === nome) {
                convidados.splice(i, 1)
            }
        }
        return res.json({ mensagem: 'Convidado removido.' });
    }
    if (convidados.every((convidado) => {
        return convidado !== nome;
    })) {
        return res.json({ mensagem: 'O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido.' });
    }
}

module.exports = {
    listarConvidados,
    adicionarConvidados,
    removerConvidados
};