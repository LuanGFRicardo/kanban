import express from "express";
import TarefaController from "../controllers/tarefasController.js";

const router = express.Router();

// Criar uma nova tarefa
router.post("/", TarefaController.createTarefa);

// Listar todas as tarefas
router.get("/", TarefaController.getAllTarefas);

// Buscar uma tarefa por ID
router.get("/:id", TarefaController.getTarefaById);

// Atualizar uma tarefa
router.put("/:id", TarefaController.updateTarefa);

// Deletar uma tarefa
router.delete("/:id", TarefaController.deleteTarefa);

// Buscar por título (se usar o método de busca por nome)
router.get("/search/:titulo", TarefaController.searchTarefaByTitulo);

export default router;
