import Coluna from "../models/Coluna.js";

class ColunaController {
  static async listarColunas(req, res) {
    try {
      const colunas = await Coluna.findAll();
      res.status(200).json(colunas);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao listar colunas` });
    }
  }

  static async cadastrarColuna(req, res) {
    try {
      const novaColuna = await Coluna.create(req.body);
      res.status(201).json({ message: "Coluna criada com sucesso!", coluna: novaColuna });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar coluna` });
    }
  }

  static async buscarColunaPorId(req, res) {
    try {
      const id = req.params.id;
      const coluna = await Coluna.findByPk(id);
      if (coluna) {
        res.status(200).json(coluna);
      } else {
        res.status(404).send("Coluna não encontrada");
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao buscar coluna` });
    }
  }

  static async atualizarColuna(req, res) {
    try {
      const id = req.params.id;
      const [atualizou] = await Coluna.update(req.body, { where: { id } });
      if (atualizou) {
        const colunaAtualizada = await Coluna.findByPk(id);
        res.status(200).json({ message: "Coluna atualizada com sucesso", coluna: colunaAtualizada });
      } else {
        res.status(404).send("Coluna não encontrada");
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao atualizar coluna` });
    }
  }

  static async deletarColuna(req, res) {
    try {
      const id = req.params.id;
      const deletou = await Coluna.destroy({ where: { id } });
      if (deletou) {
        res.status(200).json({ message: "Coluna removida com sucesso" });
      } else {
        res.status(404).send("Coluna não encontrada");
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao remover coluna` });
    }
  }
}

export default ColunaController;
