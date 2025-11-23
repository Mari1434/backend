const express = require('express');
const usuariosController = require("../controllers/usuariosController.js");
const { verificarToken } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post('/', usuariosController.criar);
router.post('/login', usuariosController.entrar);
router.post('/renovar', verificarToken, usuariosController.renovar);
router.delete('/', verificarToken, usuariosController.remover);

module.exports = router;