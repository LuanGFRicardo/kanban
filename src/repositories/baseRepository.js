// versão Sequelize

export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findAll(filter = {}) {
    return await this.model.findAll({ where: filter });
  }

  async update(id, data) {
    const [updatedRows] = await this.model.update(data, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) return null;

    return await this.findById(id);
  }

  async delete(id) {
    return await this.model.destroy({ where: { id } });
  }

  async search(query) {
    return await this.model.findAll({ where: query });
  }
}
