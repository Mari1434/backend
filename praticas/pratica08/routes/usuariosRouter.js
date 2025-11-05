const express = require('express');

const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post('/login', (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
             return res.status(400).json({ msg: "O campo 'email' é obrigatório." });
        }

        const payload = {
            email: email
        };
        
        const token = authMiddleware.gerarToken(payload);

        return res.status(200).json({ token: token });

    } catch (err) {
        return res.status(500).json({ msg: err.message || "Erro interno do servidor" });
    }
});

router.post('/renovar', authMiddleware.verificarToken, (req, res) => {

    try {
        const payload = {
            email: req.usuario.email
        };

        const token = authMiddleware.gerarToken(payload);

        return res.status(200).json({ token: token });

    } catch (err) {
        return res.status(500).json({ msg: err.message || "Erro interno do servidor" });
    }
});

module.exports = router;