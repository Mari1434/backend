import { MongoClient } from "mongodb";

let client = null;
let db = null;

async function conectarDb() {
  try {
    if (db == null) {
      const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/`;
      
      client = new MongoClient(url);
      
      await client.connect();
      console.log("Conectado ao MongoDB com sucesso!");
      db = client.db("agenda");
    }
    return db;
  } catch (e) {
    console.log("Erro ao conectar no MongoDB", e.message);
  }
}

export default conectarDb;