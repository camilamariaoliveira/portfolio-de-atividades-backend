const somar = (req, res) => {
    const { num1, num2 } = req.query;
    if (!isNaN(Number(num1)) && !isNaN(Number(num2))) {
        return res.send(`${parseInt(num1) + parseInt(num2)}`);
    }
    return res.send("Números inválido");
};

const subtrair = (req, res) => {
    const { num1, num2 } = req.query;
    if (!isNaN(Number(num1)) && !isNaN(Number(num2))) {
        return res.send(`${num1 - num2}`);
    }
    return res.send("Números inválido");
};

const multiplicar = (req, res) => {
    const { num1, num2 } = req.query;
    if (!isNaN(Number(num1)) && !isNaN(Number(num2))) {
        return res.send(`${num1 * num2}`);
    }
    return res.send("Números inválido");
};

const dividir = (req, res) => {
    const { num1, num2 } = req.query;
    if (!isNaN(Number(num1)) && !isNaN(Number(num2))) {
        return res.send(`${num1 / num2}`);
    }
    return res.send("Números inválido");
};

module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir
}