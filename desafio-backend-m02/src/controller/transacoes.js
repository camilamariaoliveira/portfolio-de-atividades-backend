const { contas, depositos, saques, transferencias } = require('../db/bancodedados');
const fs = require('fs/promises');
const { verificaExisteConta, verificaPreenchimentoDeposito, verificaValorTransaçoes, verificaPreenchimentoSaca, verificaPreenchimentoTransfere, verificaSenha, verificaSaldoDisponivel } = require('../service/verificacoes');
const { findContaByNumeroConta, filterPersistenciaContas } = require('../service/finds');

const deposita = async (req, res) => {
    try {
        const { numero_conta, valor } = req.body;

        verificaPreenchimentoDeposito(Number(numero_conta), valor);

        verificaExisteConta(Number(numero_conta));

        verificaValorTransaçoes(valor);

        const dadosConta = findContaByNumeroConta(Number(numero_conta));

        const contasDB = filterPersistenciaContas(Number(numero_conta));

        const novoSaldo = dadosConta.saldo + valor;

        const contaSaldoAtualizado = {
            numero_conta: Number(numero_conta),
            nome: dadosConta.nome,
            cpf: dadosConta.cpf,
            data_nascimento: dadosConta.data_nascimento,
            telefone: dadosConta.telefone,
            email: dadosConta.email,
            senha: dadosConta.senha,
            saldo: novoSaldo
        }

        const contasAtualizadas = [...contasDB, contaSaldoAtualizado];

        const contasStringify = JSON.stringify(contasAtualizadas);
        await fs.writeFile('./src/db/contas.json', contasStringify);

        const novoRegistro = {
            data: new Date(),
            numero_conta,
            valor
        }

        const registrosAtualizados = [...depositos, novoRegistro];
        const registroStringify = JSON.stringify(registrosAtualizados);
        await fs.writeFile('./src/db/depositos.json', registroStringify);

        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(error.status).json(error.message);
    }
};

const saca = async (req, res) => {
    try {
        const { numero_conta, valor, senha } = req.body;

        verificaPreenchimentoSaca(numero_conta, valor, senha);

        verificaExisteConta(Number(numero_conta));

        verificaValorTransaçoes(valor);

        const dadosConta = findContaByNumeroConta(Number(numero_conta));

        verificaSenha(senha, dadosConta.senha);

        verificaSaldoDisponivel(valor, dadosConta.saldo);

        const novoSaldo = dadosConta.saldo - valor;

        const contaSaldoAtualizado = {
            numero_conta: dadosConta.numero_conta,
            nome: dadosConta.nome,
            cpf: dadosConta.cpf,
            data_nascimento: dadosConta.data_nascimento,
            telefone: dadosConta.telefone,
            email: dadosConta.email,
            senha: dadosConta.senha,
            saldo: novoSaldo
        }
        const contasDB = filterPersistenciaContas(Number(numero_conta));

        const contasAtualizadas = [...contasDB, contaSaldoAtualizado];

        const contasStringify = JSON.stringify(contasAtualizadas);
        await fs.writeFile('./src/db/contas.json', contasStringify);

        const novoRegistro = {
            data: new Date(),
            numero_conta,
            valor
        }

        const registrosAtualizados = [...saques, novoRegistro];
        const registroStringify = JSON.stringify(registrosAtualizados);
        await fs.writeFile('./src/db/saques.json', registroStringify);

        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(error.status).json(error.message);
    }
};

const transfere = async (req, res) => {
    try {
        const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

        verificaPreenchimentoTransfere(numero_conta_origem, numero_conta_destino, valor, senha)

        verificaExisteConta(Number(numero_conta_origem));
        verificaExisteConta(Number(numero_conta_destino));


        const dadosContaOrigem = findContaByNumeroConta(Number(numero_conta_origem));

        verificaSenha(senha, dadosContaOrigem.senha);
        verificaValorTransaçoes(valor);
        verificaSaldoDisponivel(valor, dadosContaOrigem.saldo);

        const dadosContaDestino = findContaByNumeroConta(Number(numero_conta_destino));

        const outrasContas = contas.filter((conta) => {
            const contasDB = conta.numero_conta !== dadosContaOrigem.numero_conta && conta.numero_conta !== dadosContaDestino.numero_conta;
            return contasDB
        });

        const novoSaldoContaOrigem = dadosContaOrigem.saldo - valor;
        const novoSaldoContaDestino = dadosContaDestino.saldo + valor;

        const contaOrigemSaldoAtualizado = {
            numero_conta: dadosContaOrigem.numero_conta,
            nome: dadosContaOrigem.nome,
            cpf: dadosContaOrigem.cpf,
            data_nascimento: dadosContaOrigem.data_nascimento,
            telefone: dadosContaOrigem.telefone,
            email: dadosContaOrigem.email,
            senha: dadosContaOrigem.senha,
            saldo: novoSaldoContaOrigem
        }
        const contaDestinoSaldoAtualizado = {
            numero_conta: dadosContaDestino.numero_conta,
            nome: dadosContaDestino.nome,
            cpf: dadosContaDestino.cpf,
            data_nascimento: dadosContaDestino.data_nascimento,
            telefone: dadosContaDestino.telefone,
            email: dadosContaDestino.email,
            senha: dadosContaDestino.senha,
            saldo: novoSaldoContaDestino
        }

        const contasAtualizadas = [...outrasContas, contaOrigemSaldoAtualizado, contaDestinoSaldoAtualizado];

        const contasStringify = JSON.stringify(contasAtualizadas);
        await fs.writeFile('./src/db/contas.json', contasStringify);

        const novoRegistro = {
            data: new Date(),
            numero_conta_origem,
            numero_conta_destino,
            valor
        }

        const registrosAtualizados = [...transferencias, novoRegistro];
        const registroStringify = JSON.stringify(registrosAtualizados);
        await fs.writeFile('./src/db/transferencias.json', registroStringify);

        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(error.status).json(error.message);
    }
};

module.exports = {
    deposita,
    saca,
    transfere
}