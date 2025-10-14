import conectarDb from "./database.js";
import { ObjectId } from "mongodb";

class Tarefa {

  static async getCollection() {
    const db = await conectarDb();
    return db.collection('tarefas');
  }

  static async inserir(dadosTarefa) {
    try {
      const collection = await this.getCollection();
      const resultado = await collection.insertOne(dadosTarefa);
      console.log("Contato inserido com sucesso: ", resultado.insertedId);
      return resultado;
    } catch (error) {
      console.error("Erro ao inserir contato: ", error);
      return null;
    }
  }

  static async buscarPorNome(nome) {
    try {
      const collection = await this.getCollection();
      return await collection.findOne({ nome: nome });
    } catch (error) {
      console.error("Erro ao buscar contato: ", error);
      return null;
    }
  }
  
  static async listarTodas() {
    try {
        const collection = await this.getCollection();
        
        return await collection.find({}).toArray();
    } catch (error) {
        console.error("Erro ao listar contatos: ", error);
        return null;
    }
  }

  static async alterar(id, novosDados) {
    try {
      const collection = await this.getCollection();
      return await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: novosDados }
      );
    } catch (error) {
      console.error("Erro ao alterar contato: ", error);
      return null;
    }
  }

  static async deletar(id) {
    try {
      const collection = await this.getCollection();
      return await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Erro ao deletar contato: ", error);
      return null;
    }
  }
}

export { Tarefa };