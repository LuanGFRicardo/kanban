import { BaseRepository } from "./baseRepository.js";
import Tarefa from "../models/Tarefa.js";
import { Op } from "sequelize";

export class TarefaRepository extends BaseRepository {
  constructor() {
    super(Tarefa); // passa o modelo Tarefa para o BaseRepository
  }

  // Busca tarefas cujo título contenha o texto informado (case insensitive)
  async searchByTitulo(titulo) {
    return await this.model.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%` // busca parcial, equivalente ao regex do Mongo
        }
      }
    });
  }

  // Busca tarefas pelo status 
  async searchByStatus(status) {
    return await this.model.findAll({
        where: {
        status: {
          [Op.like]: `%${status}%` // busca parcial, equivalente ao regex do Mongo
        }
      }
    });
  }
}
