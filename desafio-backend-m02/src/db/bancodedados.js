const contas = require('./contas');
const saques = require('./saques');
const depositos = require('./depositos');
const transferencias = require('./transferencias');
const numeroTotalDeContas = require('./contador');

module.exports = {
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Cubos123Bank'
    },
    saldoInicial: 5000,
    numeroTotalDeContas,
    contas,
    saques,
    depositos,
    transferencias
}