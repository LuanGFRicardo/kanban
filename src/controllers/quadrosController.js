import { QuadroService } from "../services/quadroService.js";
import { QuadroDto } from "../dtos/quadroDTO.js";

class QuadroController {
  constructor() {
    this.quadroService = new QuadroService();
  }

  createQuadro = async (req, res) => {
    try {
      const quadroData = {
        ...req.body,
        usuarioId: req.userId, // vem do token
      };

      const newQuadro = await this.quadroService.createQuadro(quadroData);

      res.status(201).json({
        message: "Quadro criado com sucesso!",
        quadro: new QuadroDto(newQuadro),
      });
    } catch (error) {
      if (error.message === "Usuário não existe.") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).send(error.message);
    }
  };

  
  getAllQuadros = async (req, res) => {
    try {
      const usuarioId = req.userId; // vem do token via middleware
      const quadros = await this.quadroService.getQuadrosByUsuarioId(usuarioId);
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

  deleteQuadro = async (req, res) => {
    try {
      await this.quadroService.deleteQuadro(req.params.id);
      res.status(200).json({ message: "Quadro removido com sucesso!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  searchQuadroByNome = async (req, res) => {
    try {
      const { nome } = req.params;
      const quadros = await this.quadroService.searchQuadroByNome(nome);
      if (quadros.length === 0) {
        return res.status(404).json({
          message: "Nenhum quadro encontrado com o nome informado.",
          nome: nome,
        });
      }
      res.status(200).json(quadros.map((quadro) => new QuadroDto(quadro)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
}

export default new QuadroController();
