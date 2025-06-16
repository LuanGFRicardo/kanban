
import { UsuarioDto } from "../dtos/usuarioDTO.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";

export class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  createUsuario = async (usuarioData) => {
    const usuario = UsuarioDto.fromRequest(usuarioData);
    return await this.usuarioRepository.create(usuario);
  };

  getAllUsuarios = async () => {
    return await this.usuarioRepository.findAll();
  };

  getUsuarioById = async (id) => {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  };

  updateUsuario = async (id, usuarioData) => {
    const usuarioAtualizado = await this.usuarioRepository.update(id, usuarioData);
    if (!usuarioAtualizado) {
      throw new Error("Usuário não encontrado.");
    }
    return usuarioAtualizado;
  };

  deleteUsuario = async (id) => {
    const usuarioDeletado = await this.usuarioRepository.delete(id);
    if (!usuarioDeletado) {
      throw new Error("Usuário não encontrado.");
    }
    return usuarioDeletado;
  };

  // Exemplo de busca por nome (ajuste conforme necessidade)
  searchUsuariosByNome = async (nome) => {
    if (!nome || nome.trim() === "") {
      throw new Error("Informe um nome para busca.");
    }
    return await this.usuarioRepository.searchByNome(nome);
  };
}
