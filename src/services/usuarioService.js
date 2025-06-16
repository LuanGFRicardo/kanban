import { UsuarioDto } from "../dtos/usuarioDTO.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";
import bcrypt from "bcryptjs";

export class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  createUsuario = async (usuarioData) => {
  const usuario = UsuarioDto.fromRequest(usuarioData);

  // Criptografar a senha antes de salvar
  const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
  usuario.senha = senhaCriptografada;

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
    // Se o campo senha vier preenchido, aplica o hash
    if (usuarioData.senha) {
      usuarioData.senha = await bcrypt.hash(usuarioData.senha, 10);
    }

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
