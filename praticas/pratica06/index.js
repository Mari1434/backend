import dotenv from 'dotenv';
dotenv.config();

console.log("Variáveis carregadas -> HOST:", process.env.MONGODB_HOST);

import readline from "readline-sync";
import { Tarefa } from "./modelo.js";

async function main() {
  let loop = true;
  while (loop) {
    console.log("\n1 - Adicionar contato");
    console.log("2 - Buscar contato");
    console.log("3 - Atualizar contato");
    console.log("4 - Remover contato");
    console.log("5 - Sair");
    const opcao = readline.question("Escolha uma opcao: ");

    switch (opcao) {
      case '1':
        const nome = readline.question("Digite o nome do contato: ");
        const resultado = await Tarefa.inserir({ nome: nome, concluida: false });

        if (resultado) {
          console.log("Contato adicionado com sucesso!");
        } else {
          console.log("Falha ao adicionar contato. Verifique os logs de erro.");
        }
        break;

      case '2':
        const nomeBusca = readline.question("Digite o nome do contato que quer buscar: ");
        
        const contatoEncontrado = await Tarefa.buscarPorNome(nomeBusca);

        if (contatoEncontrado) {
          console.log("Contato encontrado: ", contatoEncontrado);
        } else {
          console.log("Contato não encontrado.");
        }
        break;

      case '3':
        const nomeAtualizar = readline.question("Digite o nome do contato que deseja atualizar: ");
        const contatoParaAtualizar = await Tarefa.buscarPorNome(nomeAtualizar);

        if (contatoParaAtualizar) {
          const novoNome = readline.question(`Digite o novo nome para "${contatoParaAtualizar.nome}": `);
          await Tarefa.alterar(contatoParaAtualizar._id, { nome: novoNome });
          console.log("Contato atualizado com sucesso!");
        } else {
          console.log("Contato não encontrado para atualização.");
        }
        break;

      case '4':
        const nomeRemover = readline.question("Digite o nome do contato que deseja remover: ");
        const contatoParaRemover = await Tarefa.buscarPorNome(nomeRemover);

        if (contatoParaRemover) {
          await Tarefa.deletar(contatoParaRemover._id);
          console.log("Contato removido com sucesso!");
        } else {
          console.log("Contato não encontrado para remoção.");
        }
        break;

      case '5':
        console.log("Saindo...");
        loop = false;
        process.exit(0);
        break;

      default:
        console.log("Opção inválida.");
        break;
    }
    
    if (loop) {
        console.log("\nPressione ENTER para continuar...");
        readline.question();
    }
  }
}

main();