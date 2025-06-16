import Coluna from "../models/Coluna.js";
import { ColunaDto } from "../dtos/colunaDTO.js";

class ColunaController {
  constructor() {
    this.colunaService = new ColunaService();
  }

  createColuna = async (req, res) => {
    try {
      const newColuna = await this.colunaService.createColuna(req.body);
      res.status(201).json({
        message: "Coluna criada com sucesso!",
        coluna: new ColunaDto(newColuna),
      });
    } catch (error) {
      if (error.message === "Quadro não existe.") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).send(error.message);
    }
  };


  getAllColunas = async (req, res) => {
    try {
      const colunas = await this.colunaService.getAllColunas();
      res.status(200).json(colunas.map((coluna) => new ColunaDto(coluna)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  getColunaById = async (req, res) => {
    try {
      const coluna = await this.colunaService.getColunaById(req.params.id);
      if (!coluna) {
        return res.status(404).send("Coluna não encontrada!");
      }
      res.status(200).json(new ColunaDto(coluna));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

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
