// 1. importar o framework
const express = require("express");

// 2. criar uma instância da aplicação
const app = express();

// Criar um Middleware 
app.get('/', (req, res) => {
    res.send("Olá");
});

// 3. iniciar a aplicação em uma porta
app.listen(3000, () => {
    console.log("App está On!");
})