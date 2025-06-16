import { TarefaDto } from "../dtos/tarefaDTO.js";
import { TarefaRepository } from "../repositories/TarefaRepository.js";

export class TarefaService {
  constructor() {
    this.tarefaRepository = new TarefaRepository();
  }

  createTarefa = async (tarefaData) => {
    const tarefa = TarefaDto.fromRequest(tarefaData);
    return await this.tarefaRepository.create(tarefa);
  };

  getAllTarefas = async () => {
    return await this.tarefaRepository.findAll();
  };

  getTarefaById = async (id) => {
    const tarefa = await this.tarefaRepository.findById(id);
    if (!tarefa) {
      throw new Error("Tarefa não encontrada.");
    }
    return tarefa;
  };

  updateTarefa = async (id, tarefaData) => {
    const tarefaAtualizada = await this.tarefaRepository.update(id, tarefaData);
    if (!tarefaAtualizada) {
      throw new Error("Tarefa não encontrada.");
    }
    return tarefaAtualizada;
  };

  deleteTarefa = async (id) => {
    const tarefaDeletada = await this.tarefaRepository.delete(id);
    if (!tarefaDeletada) {
      throw new Error("Tarefa não encontrada.");
    }
    return tarefaDeletada;
  };

  searchTarefasByTitulo = async (titulo) => {
    if (!titulo || titulo.trim() === "") {
      throw new Error("Informe um título para busca.");
    }
    return await this.tarefaRepository.searchByTitulo(titulo);
  };
}
