function solucao(jogadores) {
    let jogadasDeZero = 0;
    let jogadasDeUm = 0;

    for (const jogador of jogadores) {
        if (jogador.jogada) {
            jogadasDeUm++;
        } else {
            jogadasDeZero++;
        }
    }
    if (jogadasDeUm === 1 || jogadasDeZero === 1) {
        for (const jogador of jogadores) {
            if (jogador.jogada && jogadasDeUm === 1) {
                console.log(jogador.nome);
            } else if (!jogador.jogada && jogadasDeZero === 1) {
                console.log(jogador.nome);
            }
        }
    } else {
        console.log("NINGUEM");
    }
}

function processData(input) {
    solucao(JSON.parse(input));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});