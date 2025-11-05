const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get('/', authMiddleware.verificarToken, (req, res) => {
    res.json([]);
});

module.exports = router;