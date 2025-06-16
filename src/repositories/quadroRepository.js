import { Op } from "sequelize";
import { BaseRepository } from "./baseRepository.js";
import Quadro from "../models/Quadro.js";

export class QuadroRepository extends BaseRepository {
  constructor() {
    super(Quadro);
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
