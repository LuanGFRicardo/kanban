import { Op } from "sequelize";
import { BaseRepository } from "./baseRepository.js";
import Coluna from "../models/Coluna.js";

export class ColunaRepository extends BaseRepository {
  constructor() {
    super(Coluna);
  }

  async searchByNome(nome) {
    return await this.model.findAll({
      where: {
        nome: {
          [Op.like]: `%${nome}%`
        }
      }
    });
  }
}
