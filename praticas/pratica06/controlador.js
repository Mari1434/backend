import { Tarefa } from "./modelo.js";

async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome);

    await tarefa.init();

    await tarefa.inserir();

    console.log(`Contato "${nome}" adicionado.`);
    return tarefa;

}

async function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome);

    await tarefa.init();

    await tarefa.buscar();

    if (tarefaEncontrada) {
        console.log(`Contato "${nome}" encontrado.`);
    } else {
        console.log(`Contato "${nome}" não encontrado.`);
    }

    return tarefaEncontrada;
}

async function alterarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome);

    await tarefa.init();

    const tarefaEncontrada = await tarefa.buscar(idParaAtualizar);

    if (tarefaEncontrada) {

        tarefaEncontrada.nome = novoNome;
        tarefaEncontrada.concluida = concluida;
    }

    return tarefaEncontrada;
}

async function atualizarTarefa() {
    await tarefa.alterar();
    console.log("Contato atualizado!");
}

async function removerTarefa(nome) {
    const tarefa = new Tarefa(nome);

    await tarefa.init();

    const tarefaEncontrada = await tarefa.buscar();

    if (tarefaEncontrada) {
        await tarefa.deletar();

        console.log(`Contato "${nome}" removido.`);
        return true;
    }

    console.log(`Não foi possível remover, contato "${nome}" não encontrado.`);
    return false;
}

export { adicionarTarefa, buscarTarefa, alterarTarefa, atualizarTarefa, removerTarefa };