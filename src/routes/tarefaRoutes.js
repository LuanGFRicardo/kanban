import express from "express";
import TarefaController from "../controllers/tarefasController.js";

const router = express.Router();

// Listar todas as tarefas
router.get("/", TarefaController.listarTarefas);

// Buscar uma tarefa por ID
router.get("/:id", TarefaController.buscarTarefaPorId);

// Cadastrar uma nova tarefa
router.post("/", TarefaController.cadastrarTarefa);

// Atualizar uma tarefa
router.put("/:id", TarefaController.atualizarTarefa);

// Deletar uma tarefa
router.delete("/:id", TarefaController.deletarTarefa);

export default router;
