const { MongoClient } = require('mongodb');

// string de conexão
const url = "mongodb+srv://<user>:<password>@cluster0.q2partq.mongodb.net/";

const client = new MongoClient(url);

async function conectar() {
    try {
        client.connect();
        console.log("Conectado");
        return client .db("agenda");
    } catch(e) {
        console.log("Erro ao conectar no MongoDB", e.message);
    }
}

module.exports = conectar;