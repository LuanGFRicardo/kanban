import express from "express";
import ColunaController from "../controllers/colunasController.js";

const router = express.Router();

router.get("/", ColunaController.listarColunas);
router.get("/:id", ColunaController.buscarColunaPorId);
router.post("/", ColunaController.cadastrarColuna);
router.put("/:id", ColunaController.atualizarColuna);
router.delete("/:id", ColunaController.deletarColuna);

// Define a rota GET '/' que chama o método de buscar por ID
router.get("/:id", UsuariosController.buscarUsuarioPorId);
// Define a rota PUT '/' que chama o método de atualizar um usuário
router.put("/:id", UsuariosController.atualizarUsuario);
// Define a rota DELETE '/' que chama o método de deletar um usuário
router.delete("/:id", UsuariosController.deletarUsuario);

export default router;
