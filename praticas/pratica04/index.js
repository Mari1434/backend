const express = require("express");

const tarefas = [  
  { id: 1, nome: "Estudar middleware", concluida: false },  
  { id: 2, nome: "Praticar Express", concluida: true }  
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
 console.log("Tempo:", Date.now());
 console.log("Método HTTP: ", req.method);
 console.log("URL acessada: ", req.url);
 next();
});

const router = express.Router();

router.get('/', (req, res) => {
    res.json(tarefas);
});

router.post('/', (req, res) => {
    const novaTarefa = { id:tarefas.length + 1, ... req.body }
    tarefas.push(novaTarefa);
    res.status(201).send(novaTarefa);
});

router.get('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const tarefaEncontrada = tarefas.find(item => item.id == tarefaId);
    if (tarefaEncontrada) return res.send(tarefaEncontrada);
    throw Error("Tarefa não localizada");
});

router.put('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const { nome, concluida } = req.body;
    const tarefaEncontrada = tarefas.find(item => item.id == tarefaId);
    tarefaEncontrada.nome = nome; tarefaEncontrada.concluida = concluida;
    if (tarefaEncontrada) return res.send(tarefaEncontrada);
    throw Error("Tarefa não localizada");
});

router.delete('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const posicao = tarefas.findIndex(item => item.id == tarefaId);
    if (posicao >= 0) {tarefas.splice(posicao, 1); return res.status(204).end()};
    throw Error("Tarefa não localizada");
});

app.use('/tarefas', router);

app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

app.listen(3000, () => {
    console.log("App está On!");
})

module.exports = app;