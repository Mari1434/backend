require("dotenv").config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const usuariosRouter = require("./routes/usuariosRouter.js");
const produtosRouter = require("./routes/produtosRouter.js");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

module.exports = app;
