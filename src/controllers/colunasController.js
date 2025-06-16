import { ColunaService } from "../services/colunaService.js";
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

  updateColuna = async (req, res) => {
    try {
      const updatedColuna = await this.colunaService.updateColuna(req.params.id, req.body);
      if (!updatedColuna) {
        return res.status(404).send("Coluna não encontrada!");
      }
      res.status(201).json({
        message: "Coluna atualizada com sucesso!",
        coluna: new ColunaDto(updatedColuna),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  deleteColuna = async (req, res) => {
    try {
      await this.colunaService.deleteColuna(req.params.id);
      res.status(200).json({ message: "Coluna removida com sucesso!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  searchColunaByNome = async (req, res) => {
    try {
      const { nome } = req.params;
      const colunas = await this.colunaService.searchColunaByNome(nome);
      if (colunas.length === 0) {
        return res.status(404).json({
          message: "Nenhuma coluna encontrada com o nome informado.",
          nome: nome,
        });
      }
      res.status(200).json(colunas.map((coluna) => new ColunaDto(coluna)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
}

export default new ColunaController();
