const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
let jogadorDaRodada = 0;

const yourTurn = (req, res) => {
    const nomeDoJogador = jogadores[jogadorDaRodada];
    jogadorDaRodada++;
    if (jogadorDaRodada >= jogadores.length) {
        jogadorDaRodada = 0;
    }
    return res.send(`É a vez de ${nomeDoJogador} jogar!`);
};

const confer = (req, res) => {
    return res.send(jogadores);
}

const remove = (req, res) => {
    const index = Number(req.query.indice);

    if (index >= jogadores.length) {
        return res.send(`Não existe jogador no índice informado ${index} para ser removido.`);
    }

    jogadores.splice(index, 1);

    return res.send(jogadores);

};

const add = (req, res) => {
    let name = req.query.nome;
    const index = Number(req.query.indice);
    name = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`

    if (isNaN(index)) {
        jogadores.push(name);
        return res.send(`${jogadores}`);
    } else if (index >= jogadores.length) {
        return res.send(`O índice informado ${index} não existe no array. Novo jogador não adicionado.`);
    }

    jogadores.splice(index, 0, name);
    return res.send(jogadores);
};

module.exports = {
    yourTurn,
    confer,
    remove,
    add
}