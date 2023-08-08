const validarSenha = (req, res, next) => {
    const senha = 'cubos123';
    if (senha !== req.query.senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta' });
    }
    next();
}

module.exports = {
    validarSenha
};