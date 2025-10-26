const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome do produto é obrigatório"],
    trim: true,
    minLength: [3, "Nome do produto deve ter pelo menos 3 caracteres"],
  },
  preco: { 
    type: Number, 
    required: [true, "Preço do produto é obrigatório"]
    }
});

module.exports = mongoose.model("Produto", schema);