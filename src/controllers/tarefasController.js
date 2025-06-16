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

  // Atualiza uma tarefa existente
  static async atualizarTarefa(req, res) {
    try {
      const id = req.params.id; // Captura o ID da tarefa a ser atualizada
      const [atualizou] = await Tarefa.update(req.body, {
        where: { id: id } // Atualiza a tarefa onde o ID bate com o informado
      });

      if (atualizou) {
        const tarefaAtualizada = await Tarefa.findByPk(id); // Busca a tarefa atualizada
        res.status(200).json({ message: "Tarefa atualizada com sucesso", tarefa: tarefaAtualizada }); // Retorna a tarefa atualizada
      } else {
        res.status(404).send("Tarefa não encontrada"); // Se não encontrar a tarefa para atualizar, retorna status 404
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao atualizar tarefa` }); // Em caso de erro, retorna status 500
    }
  }

  // Deleta uma tarefa do banco de dados
  static async deletarTarefa(req, res) {
    try {
      const id = req.params.id; // Captura o ID da tarefa a ser deletada
      const deletou = await Tarefa.destroy({
        where: { id: id } // Deleta a tarefa onde o ID bate com o informado
      });

      if (deletou) {
        res.status(200).json({ message: "Tarefa removida com sucesso" }); // Se deletou, retorna sucesso
      } else {
        res.status(404).send("Tarefa não encontrada"); // Se não encontrar a tarefa para deletar, retorna status 404
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao remover tarefa` }); // Em caso de erro, retorna status 500
    }
  }
}

// Exporta o TarefaController para ser usado nas rotas
export default TarefaController;
