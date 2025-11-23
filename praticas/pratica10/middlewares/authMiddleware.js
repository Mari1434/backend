const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function verificarToken(req, res, next) {
    try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalido" });
  }
};

function gerarToken(payload) {
    try {
    const expiresIn = process.env.JWT_EXPIRES;
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error("Erro ao gerar o token");
  }
}

function cifrarSenha(senha) {
    const salto = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salto);
    return hash;
}

function compararSenha(senha, hash) {
    return bcrypt.compareSync(senha, hash);
}

module.exports = { verificarToken,  gerarToken, cifrarSenha, compararSenha };