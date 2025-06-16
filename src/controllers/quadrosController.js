import { QuadroService } from "../services/quadroService.js";
import { QuadroDto } from "../dtos/quadroDTO.js";

class QuadroController {
  constructor() {
    this.quadroService = new QuadroService();
  }

  static async listarQuadros(req, res) {
    try {
      const quadros = await Quadro.findAll();
      res.status(200).json(quadros);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao listar quadros` });
    }
  }

  createQuadro = async (req, res) => {
    try {
      const newQuadro = await this.quadroService.createQuadro(req.body);
      res.status(201).json({
        message: "Quadro criado com sucesso!",
        quadro: new QuadroDto(newQuadro),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  getAllQuadros = async (req, res) => {
    try {
      const quadros = await this.quadroService.getAllQuadros();
      res.status(200).json(quadros.map((quadro) => new QuadroDto(quadro)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  getQuadroById = async (req, res) => {
    try {
      const quadro = await this.quadroService.getQuadroById(req.params.id);
      if (!quadro) {
        return res.status(404).send("Quadro não encontrado!");
      }
      res.status(200).json(new QuadroDto(quadro));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  updateQuadro = async (req, res) => {
    try {
      const updatedQuadro = await this.quadroService.updateQuadro(req.params.id, req.body);
      if (!updatedQuadro) {
        return res.status(404).send("Quadro não encontrado!");
      }
      res.status(201).json({
        message: "Quadro atualizado com sucesso!",
        quadro: new QuadroDto(updatedQuadro),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  static async deletarQuadro(req, res) {
    try {
      const id = req.params.id;
      const deletou = await Quadro.destroy({ where: { id } });
      deletou
        ? res.status(200).json({ message: "Quadro removido com sucesso" })
        : res.status(404).send("Quadro não encontrado");
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao remover quadro` });
    }
  }
}

export default QuadroController;
