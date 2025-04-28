// Importa o modelo Usuario que representa a tabela de usuários no banco
import Usuario from "../models/Usuario.js";

// Define a classe UsuariosController para controlar as operações relacionadas a usuários
class UsuariosController {
  
  // Método para criar um novo usuário
  static async criarUsuario(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body); // Cria um novo usuário com os dados enviados no corpo da requisição
      res.status(201).json({ message: "Usuário criado com sucesso!", usuario: novoUsuario }); // Retorna status 201 e o novo usuário
    } catch (error) {
      res.status(500).json({ message: error.message }); // Em caso de erro, retorna status 500 e a mensagem do erro
    }
  }

  // Método para listar todos os usuários cadastrados
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll(); // Busca todos os usuários cadastrados
      res.status(200).json(usuarios); // Retorna a lista de usuários com status 200
    } catch (error) {
      res.status(500).json({ message: error.message }); // Em caso de erro, retorna status 500 e a mensagem do erro
    }
  }
}

// Exporta o controller para ser usado nas rotas
export default UsuariosController;
