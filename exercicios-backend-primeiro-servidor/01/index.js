const express = require('express');

const app = express();

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
let jogadorDaRodada = 0;

app.get('/', (req, res) => {
    const nomeDoJogador = jogadores[jogadorDaRodada];
    jogadorDaRodada++;
    if (jogadorDaRodada >= jogadores.length) {
        jogadorDaRodada = 0;
    }
    return res.send(`É a vez de ${nomeDoJogador} jogar!`);
});

app.listen(3000);