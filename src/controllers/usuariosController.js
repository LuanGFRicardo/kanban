import { UsuarioService } from "../services/usuarioService.js";
import { UsuarioDto } from "../dtos/usuarioDTO.js";

class UsuarioController {
  constructor() {
    this.usuarioService = new UsuarioService();
  }

  createUsuario = async (req, res) => {
    try {
      const novoUsuario = await this.usuarioService.createUsuario(req.body);
      res.status(201).json({
        message: "Usuário criado com sucesso!",
        usuario: new UsuarioDto(novoUsuario),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  getAllUsuarios = async (req, res) => {
    try {
      const usuarios = await this.usuarioService.getAllUsuarios();
      res.status(200).json(usuarios.map(u => new UsuarioDto(u)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  getUsuarioById = async (req, res) => {
    try {
      const usuario = await this.usuarioService.getUsuarioById(req.params.id);
      res.status(200).json(new UsuarioDto(usuario));
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

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
