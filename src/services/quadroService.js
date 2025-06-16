import { QuadroDto } from "../dtos/quadroDTO.js";
import Usuario from "../models/Usuario.js";
import { QuadroRepository } from "../repositories/QuadroRepository.js";

export class QuadroService {
  constructor() {
    this.quadroRepository = new QuadroRepository();
  }

  createQuadro = async (quadroData) => {
    const quadro = QuadroDto.fromRequest(quadroData);
    // verifica se existe o usuario
    const usuario = await Usuario.findByPk(quadro.usuarioId);
    if (!usuario) {
      throw new Error("Usuário não existe.");
    }
    return await this.quadroRepository.create(quadro);
  };

  getAllQuadros = async () => {
    return await this.quadroRepository.findAll();
  };

  // Adicionado para buscar pelo usuário
  getQuadrosByUsuarioId = async (usuarioId) => {
    return await this.quadroRepository.findByUsuarioId(usuarioId);
  };

  getQuadroById = async (id) => {
    const quadro = await this.quadroRepository.findById(id);
    if (!quadro) {
      throw new Error("Quadro não encontrado.");
    }
    return quadro;
  };

  updateQuadro = async (id, quadroData) => {
    const quadroAtualizado = await this.quadroRepository.update(id, quadroData);
    if (!quadroAtualizado) {
      throw new Error("Quadro não encontrado.");
    }
    return quadroAtualizado;
  };

  deleteQuadro = async (id) => {
    const quadroDeletado = await this.quadroRepository.delete(id);
    if (!quadroDeletado) {
      throw new Error("Quadro não encontrado.");
    }
    return quadroDeletado;
  };

  searchQuadroByNome = async (nome) => {
    if (!nome || nome.trim() === "") {
      throw new Error("Informe o nome do quadro para busca.");
    }
    return await this.quadroRepository.searchByNome(nome);
  };
}
