// Importa o Express para criar o roteador
import express from "express";

// Importa o controller que lida com a lógica de criação e listagem de usuários
import UsuariosController from "../controllers/usuariosController.js";

// Cria um roteador do Express
const router = express.Router();

// Criar um novo usuário
router.post("/", UsuariosController.createUsuario);

// Listar todos os usuários
router.get("/", UsuariosController.getAllUsuarios);

// Buscar usuário por ID
router.get("/:id", UsuariosController.getUsuarioById);

// Atualizar usuário
router.put("/:id", UsuariosController.updateUsuario);

// Deletar usuário
router.delete("/:id", UsuariosController.deleteUsuario);

// Buscar por nome
router.get("/search/:nome", UsuariosController.searchUsuarioByNome);

export default router;
