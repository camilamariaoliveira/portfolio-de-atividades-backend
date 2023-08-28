const { numeroTotalDeContas, contas, saldoInicial, transferencias } = require('../db/bancodedados');
const fs = require('fs/promises');
const { verificaPreenchimentoCadastro, verificaCpfRepetidos, verificaEmailRepetidos, verificaSaldoEhZero, verificaExisteConta, verificaParametroQuery, verificaDigitosData } = require('../service/verificacoes');
const { findContaByNumeroConta, filterPersistenciaContas, findDepositosByNumeroConta, findSaquesByNumeroConta, findTransferenciasRecebidasByNumeroConta, findTransferenciasEnviadasByNumeroConta } = require('../service/finds');

const listaContas = async (req, res) => {
    res.json(contas);
};

const criaConta = async (req, res) => {
    try {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        verificaPreenchimentoCadastro(nome, cpf, data_nascimento, telefone, email, senha);
        verificaCpfRepetidos(cpf);
        verificaEmailRepetidos(email);

        const conta = {
            numero_conta: numeroTotalDeContas,
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
            saldo: saldoInicial
        }

        const novoArray = [...contas, conta];
        const contasStringify = JSON.stringify(novoArray);
        const incrementoContador = JSON.stringify(numeroTotalDeContas + 1);

        await fs.writeFile('./src/db/contas.json', contasStringify);
        await fs.writeFile('./src/db/contador.json', incrementoContador);

        return res.status(201).json();

    } catch (error) {
        return res.status(error.status).json(error.message);
    }
};

const atualizaConta = async (req, res) => {
    try {
        const numero_conta = Number(req.params.numeroConta);
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        verificaPreenchimentoCadastro(nome, cpf, data_nascimento, telefone, email, senha);

        const dadosConta = findContaByNumeroConta(numero_conta);

        if (cpf !== dadosConta.cpf) {
            verificaCpfRepetidos(cpf)
        }
        if (email !== dadosConta.email) {
            verificaEmailRepetidos(email)
        }

        const contaParaAtualizar = {
            numero_conta,
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
            saldo: dadosConta.saldo
        }

        const contasDB = filterPersistenciaContas(numero_conta);

        const contasAtualizadas = [...contasDB, contaParaAtualizar];

        const contasStringify = JSON.stringify(contasAtualizadas);
        await fs.writeFile('./src/db/contas.json', contasStringify);

        return res.status(204).json();

    } catch (error) {
        console.log(error);
        return res.status(error.status).json(error.message);
    }
};

const excluiConta = async (req, res) => {
    try {
        const numero_conta = Number(req.params.numeroConta);

        const dadosConta = findContaByNumeroConta(numero_conta);

        verificaExisteConta(numero_conta);

        verificaSaldoEhZero(dadosConta.saldo);

        const contasNaoRemovidas = filterPersistenciaContas(numero_conta);

        const contasStringify = JSON.stringify(contasNaoRemovidas);
        await fs.writeFile('./src/db/contas.json', contasStringify);

        return res.status(204).json();

    } catch (error) {
        return res.status(error.status).json(error.message);
    }
};

const mostraSaldo = async (req, res) => {
    const { numero_conta, senha } = req.query;

    verificaParametroQuery(numero_conta, senha);

    verificaExisteConta(Number(numero_conta));

    const dadosConta = findContaByNumeroConta(Number(numero_conta));

    if (dadosConta.senha !== senha) {
        throw new HttpException("Senha inválida", 401);
    }

    return res.status(200).json(dadosConta.saldo);
};

const mostraExtrato = async (req, res) => {
    try {
        const { numero_conta, senha } = req.query;

        verificaParametroQuery(numero_conta, senha);

        verificaExisteConta(Number(numero_conta));

        const depositosDaConta = findDepositosByNumeroConta(numero_conta).map(deposito => {
            const d = new Date(deposito.data);
            const month = verificaDigitosData(d.getUTCMonth() + 1);
            const day = verificaDigitosData(d.getUTCDate());
            return {
                ...deposito,
                data: `${d.getUTCFullYear()}-${month}-${day} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
            }
        });

        const saquesDaConta = findSaquesByNumeroConta(numero_conta).map(saque => {
            const d = new Date(saque.data);
            const month = verificaDigitosData(d.getUTCMonth() + 1);
            const day = verificaDigitosData(d.getUTCDate());
            return {
                ...saque,
                data: `${d.getUTCFullYear()}-${month}-${day} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
            };
        });

        const transferenciasEnviadas = findTransferenciasEnviadasByNumeroConta(numero_conta).map(transferencias => {
            const date = new Date(transferencias.data);
            const month = verificaDigitosData(date.getUTCMonth() + 1);
            const day = verificaDigitosData(date.getUTCDate());
            return {
                ...transferencias,
                data: `${date.getUTCFullYear()}-${month}-${day} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
            };
        });

        const transferenciasRecebidas = findTransferenciasRecebidasByNumeroConta(numero_conta).map(transferencias => {
            const d = new Date(transferencias.data);
            const month = verificaDigitosData(d.getUTCMonth() + 1);
            const day = verificaDigitosData(d.getUTCDate());
            return {
                ...transferencias,
                data: `${d.getUTCFullYear()}-${month}-${day} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
            };
        });
        console.log(transferenciasRecebidas);


        const extrato = {
            depositos: depositosDaConta,
            saques: saquesDaConta,
            transferenciasEnviadas,
            transferenciasRecebidas
        }

        return res.status(200).json(extrato);
    } catch (error) {
        return res.status(error.status).json(error.message);
    }
};

module.exports = {
    listaContas,
    criaConta,
    atualizaConta,
    excluiConta,
    mostraSaldo,
    mostraExtrato
}