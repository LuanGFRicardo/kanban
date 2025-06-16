import { Op } from "sequelize";
import { BaseRepository } from "./baseRepository.js";
import Usuario from "../models/Usuario.js";

export class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
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
