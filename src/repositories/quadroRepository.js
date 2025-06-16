import { BaseRepository } from "./baseRepository.js";
import Quadro from "../models/Quadro.js";

export class QuadroRepository extends BaseRepository {
  constructor() {
    super(Quadro);
  }

  async findByUsuarioId(usuarioId) {
    return await this.model.findAll({
      where: { usuarioId }
    });
  }
}
