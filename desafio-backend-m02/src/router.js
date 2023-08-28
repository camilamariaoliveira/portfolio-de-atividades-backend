const express = require('express');
const autentica = require('./intermediarios');
const { listaContas, criaConta, atualizaConta, excluiConta, mostraSaldo, mostraExtrato } = require('./controller/contas')
const { deposita, saca, transfere } = require('./controller/transacoes');
const rotes = express();

rotes.get('/contas', autentica, listaContas);
rotes.post('/contas', criaConta);
rotes.put('/contas/:numeroConta/usuario', atualizaConta);
rotes.delete('/contas/:numeroConta', excluiConta);
rotes.post('/transacoes/depositar', deposita);
rotes.post('/transacoes/sacar', saca);
rotes.post('/transacoes/transferir', transfere);
rotes.get('/contas/saldo', mostraSaldo);
rotes.get('/contas/extrato', mostraExtrato);

module.exports = rotes;