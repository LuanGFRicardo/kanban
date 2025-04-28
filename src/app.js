import express from "express";

const app = express();
app.use(express.json());

let tarefas = [
    {
        id: 1,
        titulo: "Criar layout inicial",
        descricao: "Desenvolver o layout da tela de login",
        status: "TO_DO",
        quadroId: 101
    },
    {
        id: 2,
        titulo: "Implementar autenticação",
        descricao: "Adicionar login com JWT",
        status: "IN_PROGRESS",
        quadroId: 101
    }
];

function buscarTarefa(id) {
    return tarefas.findIndex(tarefa => tarefa.id === Number(id));
}

app.get("/", (req, res) => {
    res.status(200).send("API de Tarefas com Express e Node.js");
});

app.get("/tarefas", (req, res) => {
    res.status(200).json(tarefas);
});

app.post("/tarefas", (req, res) => {
    tarefas.push(req.body);
    res.status(201).send("Tarefa criada com sucesso!");
});

app.get("/tarefas/:id", (req, res) => {
    const index = buscarTarefa(req.params.id);
    if (index !== -1) {
        res.status(200).json(tarefas[index]);
    } else {
        res.status(404).send("Tarefa não encontrada");
    }
});

app.put("/tarefas/:id", (req, res) => {
    const index = buscarTarefa(req.params.id);
    if (index !== -1) {
        tarefas[index] = {
            ...tarefas[index],
            ...req.body
        };
        res.status(200).json(tarefas[index]);
    } else {
        res.status(404).send("Tarefa não encontrada");
    }
});

app.delete("/tarefas/:id", (req, res) => {
    const index = buscarTarefa(req.params.id);
    if (index !== -1) {
        tarefas.splice(index, 1);
        res.status(200).send("Tarefa removida com sucesso!");
    } else {
        res.status(404).send("Tarefa não encontrada");
    }
});

export default app;
