import { ColunaDto } from "../dtos/colunaDTO.js";
import { ColunaRepository } from "../repositories/ColunaRepository.js";

export class ColunaService {
  constructor() {
    this.colunaRepository = new ColunaRepository();
  }

  createColuna = async (colunaData) => {
    const coluna = ColunaDto.fromRequest(colunaData);
    return await this.colunaRepository.create(coluna);
  };

  getAllColunas = async () => {
    return await this.colunaRepository.findAll();
  };

  getColunaById = async (id) => {
    const coluna = await this.colunaRepository.findById(id);
    if (!coluna) throw new Error("Coluna não encontrada.");
    return coluna;
  };

  updateColuna = async (id, colunaData) => {
    const colunaAtualizada = await this.colunaRepository.update(id, colunaData);
    if (!colunaAtualizada) throw new Error("Coluna não encontrada.");
    return colunaAtualizada;
  };

  deleteColuna = async (id) => {
    const colunaDeletada = await this.colunaRepository.delete(id);
    if (!colunaDeletada) throw new Error("Coluna não encontrada.");
    return colunaDeletada;
    };

    searchColunaByNome = async (nome) => {
    if (!nome || nome.trim() === "") {
        throw new Error("Informe o nome da coluna para busca.");
    }
    return await this.colunaRepository.searchByNome(nome);
    };  
}
