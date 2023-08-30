function solucao(texto) {
    const textoFormatado = texto.trim();
    const arrayDePalavras = textoFormatado.split(" ");
    const novoArray = arrayDePalavras.filter((palavra) => {
        return palavra !== "";
    });
    let contadorDePalavras = 0;
    if (!textoFormatado) {
        console.log(`${0}`);
    } else {
        for (const palavra of novoArray) {
            if (palavra !== " ") {
                contadorDePalavras++;
            }
        }
        console.log(contadorDePalavras);
    }
}

function processData(input) {
    solucao(input)
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