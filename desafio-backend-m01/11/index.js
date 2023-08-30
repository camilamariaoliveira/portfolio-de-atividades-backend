function solucao(min, km) {
    const valorPorMin = 50;
    const valorPorKm = 70;
    const valorMinAdicional = 30;
    const valorKmAdicional = 50;

    const minutosComDesconto = (min - 20) * valorMinAdicional;
    const kmsComDesconto = (km - 10) * valorKmAdicional;

    let totalMinutos = 0;
    let totalKms = 0;

    if (min > 20) {
        totalMinutos = (valorPorMin * 20) + minutosComDesconto;
    } else {
        totalMinutos = min * valorPorMin;
    }

    if (km > 10) {
        totalKms = (valorPorKm * 10) + kmsComDesconto;
    } else {
        totalKms = km * valorPorKm;
    }

    console.log((Math.trunc(totalMinutos + totalKms)));
}

function processData(input) {
    const x = input.split(" ");
    const min = parseFloat(x[0], 10);
    const km = parseFloat(x[1], 10);
    solucao(min, km);
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