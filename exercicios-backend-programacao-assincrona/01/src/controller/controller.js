const database = require('../bancodedados/produtos')
const { getStateFromZipcode } = require('utils-playground');

const getProducts = async (req, res) => {
    return res.status(200).json(database);
}

const findProductById = async (req, res) => {
    const idProduct = req.params.idProduto;
    const product = database.find(product => {
        return product.id === Number(idProduct)
    });

    if (!product) {
        res.status(404).json({ mensagem: 'Não existe produto para o ID informado.' });
    }

    res.json(product);
}

const calculateShipping = async (req, res) => {
    const { idProduto, cep } = req.params;
    const state = await getStateFromZipcode(cep);
    const product = database.find((product) => {
        return product.id === Number(idProduto)
    });
    let stateShipping = 0.12;

    if (state === "BA" || state === "SE" || state === "AL" || state === "PE" || state === "PB") {
        stateShipping = 0.10;
    }
    if (state === "SP" || state === "RJ") {
        stateShipping = 0.15;
    }

    const shippingCost = (product.valor * stateShipping);

    console.log(product, state, shippingCost);
    res.json({ ...product, state, shippingCost });
}


module.exports = {
    getProducts,
    findProductById,
    calculateShipping
};