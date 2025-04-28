// Importa o Express para criar o roteador
import express from "express";

// Importa o controller que lida com a lógica de criação e listagem de usuários
import UsuariosController from "../controllers/usuariosController.js";

// Cria um roteador do Express
const router = express.Router();

// Define a rota POST '/' que chama o método de criar um usuário
router.post("/", UsuariosController.criarUsuario);

// Define a rota GET '/' que chama o método de listar todos os usuários
router.get("/", UsuariosController.listarUsuarios);

// Exporta o roteador para ser usado no app.js
export default router;
