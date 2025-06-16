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

  // Método para buscar usuário por ID
  static async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Método para atualizar usuário
  static async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const [atualizou] = await Usuario.update(req.body, {
        where: { id }
      });

      if (atualizou) {
        const usuarioAtualizado = await Usuario.findByPk(id);
        res.status(200).json({ message: "Usuário atualizado com sucesso", usuario: usuarioAtualizado });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Método para deletar usuário
  static async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      const deletou = await Usuario.destroy({
        where: { id }
      });

      if (deletou) {
        res.status(200).json({ message: "Usuário removido com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

// Exporta o controller para ser usado nas rotas
export default UsuariosController;
