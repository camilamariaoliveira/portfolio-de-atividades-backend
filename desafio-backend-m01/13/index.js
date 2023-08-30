function processData(input) {
    const inputFormatado = (input.trim()).split("\n");

    const funcionariosCubos = inputFormatado[0] * 1;
    const iPonto = inputFormatado.filter(ponto => ponto.includes(" ")).map(pontos => {
        const arrayPontos = pontos.split(" ");
        return {
            x: arrayPontos[0] * 1,
            y: arrayPontos[1] * 1,
        }
    });
    let maiorDistancia = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < funcionariosCubos; i++) {
        const funcionario1 = iPonto[i];

        for (let j = i + 1; j < funcionariosCubos; j++) {
            const funcionario2 = iPonto[j];
            const distancia = Math.sqrt(((funcionario2.x - funcionario1.x) ** 2) + ((funcionario2.y - funcionario1.y) ** 2))
            if (distancia > maiorDistancia) {
                maiorDistancia = distancia;
            }
        }
    }
    if (!funcionariosCubos) {
        console.log(0);
    } else {
        console.log(maiorDistancia);
    }
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