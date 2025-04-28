// Importa o modelo Tarefa, que representa a tabela de tarefas no banco de dados
import Tarefa from "../models/Tarefa.js";

// Define a classe TarefaController, que gerencia as operações relacionadas às tarefas
class TarefaController {

  // Lista todas as tarefas cadastradas no banco de dados
  static async listarTarefas(req, res) {
    try {
      const listaTarefas = await Tarefa.findAll(); // Busca todas as tarefas
      res.status(200).json(listaTarefas); // Retorna as tarefas encontradas com status 200 (OK)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao listar tarefas` }); // Em caso de erro, retorna status 500
    }
  }

  // Cadastra uma nova tarefa no banco de dados
  static async cadastrarTarefa(req, res) {
    try {
      const novaTarefa = await Tarefa.create(req.body); // Cria uma nova tarefa com os dados enviados na requisição
      res.status(201).json({ message: "Tarefa criada com sucesso!", tarefa: novaTarefa }); // Retorna a nova tarefa com status 201 (Criado)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar tarefa` }); // Em caso de erro, retorna status 500
    }
  }

  // Busca uma tarefa específica pelo ID
  static async buscarTarefaPorId(req, res) {
    try {
      const id = req.params.id; // Captura o ID da tarefa pelos parâmetros da requisição
      const tarefaEncontrada = await Tarefa.findByPk(id); // Busca a tarefa pelo ID (chave primária)

      if (tarefaEncontrada) {
        res.status(200).json(tarefaEncontrada); // Se encontrar, retorna a tarefa
      } else {
        res.status(404).send("Tarefa não encontrada"); // Se não encontrar, retorna status 404
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao buscar tarefa` }); // Em caso de erro, retorna status 500
    }
  }

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
