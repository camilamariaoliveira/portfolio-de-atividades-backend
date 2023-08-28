const { contas, saques, depositos, transferencias } = require('../db/bancodedados');
const HttpException = require('../error/httpexception');
const findContaByNumeroConta = (numero_conta) => {
    const found = contas.filter((conta) => conta.numero_conta === numero_conta);
    if (!found) {
        throw new HttpException("Conta bancária não encontada!", 404);
    }
    return found[0]
};

const filterPersistenciaContas = (numero_conta) => {
    const contasDB = contas.filter((conta) => {
        return conta.numero_conta !== numero_conta;
    })
    return contasDB;
};

const findDepositosByNumeroConta = (numero_conta) => {
    const depositosParaExtrato = depositos.filter((deposito => deposito.numero_conta === numero_conta));
    return depositosParaExtrato;
};

const findSaquesByNumeroConta = (numero_conta) => {
    const saquesParaExtrato = saques.filter((saque => saque.numero_conta === numero_conta));
    return saquesParaExtrato;
};

const findTransferenciasEnviadasByNumeroConta = (numero_conta) => {
    const transferenciasParaExtrato = transferencias.filter((transferencia => transferencia.numero_conta_origem === numero_conta));
    return transferenciasParaExtrato;
};

const findTransferenciasRecebidasByNumeroConta = (numero_conta) => {
    const transferenciasParaExtrato = transferencias.filter((transferencia => transferencia.numero_conta_destino === numero_conta));
    return transferenciasParaExtrato;
};

module.exports = {
    findContaByNumeroConta,
    filterPersistenciaContas,
    findDepositosByNumeroConta,
    findSaquesByNumeroConta,
    findTransferenciasEnviadasByNumeroConta,
    findTransferenciasRecebidasByNumeroConta
}