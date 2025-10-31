var express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/auth');
var router = express.Router();


router.post('/login', function(req, res, next) {
  const { username, password } = req.body;

  if(username === 'mariana.libanio@iesb.edu.br' && password === 'mari123') {
    const payload = {
      iss: "Minha API",
      email: username,
      nome: "Mariana",
      perfil: "Estudante"
    }
    try {
    return res.json({token: gerarToken(payload)});
    } catch(err) {
      return res.status(500).json({msg: err.message});
    }
  }
  return res.status(401).json({msg: "Credenciais inválidas"});
});

router.post('/renovar', verificarToken, function (req,res) {
  try {
    const payload = {
      iss: req.payload.iss,
      email: req.payload.email,
      nome: req.payload.nome,
      perfil: req.payload.perfil
    }
  } catch(err) {
      return res.json({token: gerarToken(payload)});
    }
  return res.status(500).json({msg: err.message});
});

module.exports = router;