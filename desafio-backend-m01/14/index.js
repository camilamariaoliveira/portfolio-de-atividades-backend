function processData(input) {
    const senhas = (input.trim()).split("\n");
    const senhaCorreta = senhas[0];
    const senhaDigitada = senhas[1];
    let contador = 0;
    let indice = 0;
    for (let i = 0; i < senhaCorreta.length; i++) {
        while (indice < senhaDigitada.length) {
            if (senhaCorreta[i] === senhaDigitada[indice]) {
                contador++;
                indice++;
                break
            } else {
                indice++;
            }
        }
    }
    console.log(senhaCorreta.length === contador ? "SIM" : "NAO");
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