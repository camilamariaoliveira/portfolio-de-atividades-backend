const { contas } = require('../db/bancodedados');
const HttpException = require('../error/httpexception');

const verificaPreenchimentoCadastro = (nome, cpf, data_nascimento, telefone, email, senha) => {

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        throw new HttpException("Todos os campos devem ser preenchidos!", 400);
    }
};

const verificaCpfRepetidos = (cpf) => {
    const verificaCPF = contas.find(userCPF => userCPF.cpf === cpf);

    if (verificaCPF) {
        throw new HttpException("Já existe uma conta com o cpf informado!", 409);
    }
};

const verificaEmailRepetidos = (email) => {
    const verificaEmail = contas.find(userEmail => userEmail.email === email);
    if (verificaEmail) {
        throw new HttpException("Já existe uma conta com o e-mail informado!", 409);
    }
};

const verificaExisteConta = (numero_conta) => {
    const numeroDaContaExiste = contas.find((userNumeroConta) => { return userNumeroConta.numero_conta === numero_conta });

    if (!numeroDaContaExiste) {
        throw new HttpException("Conta bancária não encontada!", 404);
    }
};

const verificaSaldoEhZero = (saldo) => {
    if (saldo !== 0) {
        throw new HttpException("A conta só pode ser removida se o saldo for zero!", 400);
    }
};

const verificaParametroQuery = (numero_conta, senha) => {

    if (numero_conta === undefined || senha === undefined) {
        throw new HttpException("É necessário preencher o numero da conta e a senha!", 400);
    }
};

const verificaPreenchimentoDeposito = (numero_conta, valor) => {
    if (!numero_conta || !valor) {
        throw new HttpException("O número da conta e o valor são obrigatórios!", 400);
    }
};

const verificaPreenchimentoSaca = (numero_conta, valor, senha) => {
    if (!numero_conta || !valor || !senha) {
        throw new HttpException("O número da conta, senha e o valor são obrigatórios!", 400);
    }
};

const verificaPreenchimentoTransfere = (numero_conta_origem, numero_conta_destino, valor, senha) => {

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        throw new HttpException("Os campos de número da conta de origem, destino, valor e senha são obrigatórios!", 400);
    }
};

const verificaValorTransaçoes = (valor) => {
    if (valor <= 0) {
        throw new HttpException("Não é possível depositar, sacar ou transferir valores negativos ou zerados!", 400);
    }
};

const verificaSaldoDisponivel = (valor, saldo) => {
    if (valor > saldo) {
        throw new HttpException("Não há saldo disponível para saque!", 400);
    }
};

const verificaSenha = (senhaDaRequisicao, senhaDoBanco) => {
    if (senhaDaRequisicao !== senhaDoBanco) {
        throw new HttpException("Senha inválida", 401);
    }
};

const verificaDigitosData = (numero) => {
    if (numero <= 9) { return "0" + numero; } else { return numero; }
};

module.exports = {
    verificaPreenchimentoCadastro,
    verificaCpfRepetidos,
    verificaEmailRepetidos,
    verificaExisteConta,
    verificaSaldoEhZero,
    verificaParametroQuery,
    verificaPreenchimentoDeposito,
    verificaPreenchimentoSaca,
    verificaPreenchimentoTransfere,
    verificaValorTransaçoes,
    verificaSaldoDisponivel,
    verificaSenha,
    verificaDigitosData
}