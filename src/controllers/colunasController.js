import Coluna from "../models/Coluna.js";
import { ColunaDto } from "../dtos/colunaDTO.js";

class ColunaController {
  constructor() {
    this.colunaService = new ColunaService();
  }
  
  static async listarColunas(req, res) {
    try {
      const colunas = await Coluna.findAll();
      res.status(200).json(colunas);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao listar colunas` });
    }
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
