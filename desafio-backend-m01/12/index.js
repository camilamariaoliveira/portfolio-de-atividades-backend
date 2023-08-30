function processData(input) {
    const regExLowerCase = /([a-z])/g;
    const regExUpperCase = /([A-Z])+/g;
    const primeiraLetra = input.substring(0, 1);
    const restoDaPalavra = (input.substring(1)).trim();
    const cadaLetra = restoDaPalavra.split("");

    let cadaLetraUpperCase = cadaLetra.every(function (letra) { return letra.match(regExUpperCase) });

    if (primeiraLetra.match(regExLowerCase) && cadaLetraUpperCase) {
        console.log(primeiraLetra.toUpperCase().concat('', restoDaPalavra.toLowerCase()));
    } else if (primeiraLetra.match(regExUpperCase) && cadaLetraUpperCase) {
        console.log(input.toLowerCase());
    } else {
        console.log(input);
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