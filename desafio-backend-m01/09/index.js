function solucao(precos) {
    let valorTotal = 0;
    let temDesconto = false;
    let menorPreco = Number.POSITIVE_INFINITY;
    for (const preco of precos) {
        valorTotal += preco;
        if (precos.length >= 3 && preco < menorPreco) {
            menorPreco = preco;
            temDesconto = true;
        }
    }
    console.log(temDesconto ? `${valorTotal - (menorPreco * 0.5)}` : `${valorTotal}`);
}

function processData(input) {
    const lista = input.split(" ");
    lista.forEach((x, i, a) => a[i] = parseInt(x, 10));
    solucao(lista);
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