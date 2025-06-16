import { TarefaDto } from "../dtos/tarefaDTO.js";
import { TarefaRepository } from "../repositories/TarefaRepository.js";
import Coluna from "../models/Coluna.js";
import Quadro from "../models/Quadro.js";


export class TarefaService {
  constructor() {
    this.tarefaRepository = new TarefaRepository();
  }

  createTarefa = async (tarefaData) => {
    const { quadroId, colunaId } = tarefaData;

    // Verifica se o quadro existe
    const quadro = await Quadro.findByPk(quadroId);
    if (!quadro) {
      throw new Error("Quadro informado não existe.");
    }

    // Verifica se a coluna existe
    const coluna = await Coluna.findByPk(colunaId);
    if (!coluna) {
      throw new Error("Coluna informada não existe.");
    }

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
    // Verifica se a tarefa existe
    const tarefa = await this.tarefaRepository.findById(id);
    if (!tarefa) {
      throw new Error("Tarefa não encontrada.");
    }

    // Se a tarefaData tiver quadroId, verifica se ele existe
    if (tarefaData.quadroId) {
      const quadro = await Quadro.findByPk(tarefaData.quadroId);
      if (!quadro) {
        throw new Error("Quadro informado não existe.");
      }
    }

    // Se a tarefaData tiver colunaId, verifica se ela existe
    if (tarefaData.colunaId) {
      const coluna = await Coluna.findByPk(tarefaData.colunaId);
      if (!coluna) {
        throw new Error("Coluna informada não existe.");
      }
    }

    // Atualiza se estiver tudo certo
    return await this.tarefaRepository.update(id, tarefaData);
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
