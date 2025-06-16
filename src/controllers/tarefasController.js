import { TarefaService } from "../services/tarefaService.js";
import { TarefaDto } from "../dtos/tarefaDTO.js";

class TarefaController {
  constructor() {
    this.tarefaService = new TarefaService();
  }

  createTarefa = async (req, res) => {
    try {
      const novaTarefa = await this.tarefaService.createTarefa(req.body);
      res.status(201).json({
        message: "Tarefa criada com sucesso!",
        tarefa: new TarefaDto(novaTarefa),
      });
    } catch (error) {
      if (
        error.message === "Quadro informado não existe." ||
        error.message === "Coluna informada não existe."
      ) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).send(error.message);
    }
  };


  getAllTarefas = async (req, res) => {
    try {
      const tarefas = await this.tarefaService.getAllTarefas();
      res.status(200).json(tarefas.map((t) => new TarefaDto(t)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  getTarefaById = async (req, res) => {
    try {
      const tarefa = await this.tarefaService.getTarefaById(req.params.id);
      res.status(200).json(new TarefaDto(tarefa));
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  updateTarefa = async (req, res) => {
    try {
      const tarefaAtualizada = await this.tarefaService.updateTarefa(req.params.id, req.body);
      res.status(200).json({
        message: "Tarefa atualizada com sucesso!",
        tarefa: new TarefaDto(tarefaAtualizada),
      });
    } catch (error) {
      if (
        error.message === "Tarefa não encontrada." ||
        error.message === "Quadro informado não existe." ||
        error.message === "Coluna informada não existe."
      ) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).send(error.message);

    }
  };


  deleteTarefa = async (req, res) => {
    try {
      await this.tarefaService.deleteTarefa(req.params.id);
      res.status(200).json({
        message: "Tarefa removida com sucesso!",
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  searchTarefaByTitulo = async (req, res) => {
    try {
      const { titulo } = req.params;
      const tarefas = await this.tarefaService.searchTarefasByTitulo(titulo);
      if (tarefas.length === 0) {
        return res.status(404).json({
          message: "Nenhuma tarefa encontrada com o título informado.",
          titulo: titulo,
        });
      }
      res.status(200).json(tarefas.map((t) => new TarefaDto(t)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
}

export default new TarefaController();
