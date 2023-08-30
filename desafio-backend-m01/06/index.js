function solucao(lista) {
    let maisJovem = Number.POSITIVE_INFINITY;
    let peloMenosUm = false;
    for (const idade of lista) {
        if (idade >= 18 && idade < maisJovem) {
            maisJovem = idade;
            peloMenosUm = true;
        }
    }
    console.log(peloMenosUm ? `${maisJovem}` : "CRESCA E APARECA");
}

function processData(input) {
    //Enter your code here
    const strings = input.split(" ");
    const numeros = [];
    for (let i = 0; i < strings.length; i++) {
        numeros.push(parseInt(strings[i], 10));
    }
    solucao(numeros);
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