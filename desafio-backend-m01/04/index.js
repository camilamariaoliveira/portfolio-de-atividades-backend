function solucao(min, max, valores) {
    const valoresAutorizados = [];

    for (let i = 0; i < valores.length; i++) {
        const valor = valores[i];
        if (valor >= min && valor <= max) {
            valoresAutorizados.push(valor);
        }
    }

    console.log(valoresAutorizados);
}

function processData(input) {
    //Enter your code here
    const lines = input.split("\n");
    const min = lines[0];
    const max = lines[1];
    const strings = lines[2].split(" ");
    const valores = [];
    for (let i = 0; i < strings.length; i++) {
        valores.push(parseInt(strings[i], 10));
    }
    solucao(min, max, valores);
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