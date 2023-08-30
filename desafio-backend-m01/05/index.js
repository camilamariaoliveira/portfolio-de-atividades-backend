function solucao(carta) {
    const arrayDeCartas = ["Q", "J", "K", "A", "2", "3"];
    const arrayDeManilhas = ["J", "K", "A", "2", "3", "Q"];
    for (let i = 0; i < arrayDeCartas.length; i++) {
        if (carta === arrayDeCartas[i]) {
            console.log(arrayDeManilhas[i]);
        }
    }
}

function processData(input) {
    solucao(input);
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