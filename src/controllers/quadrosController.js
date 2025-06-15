import Quadro from "../models/Quadro.js";

class QuadroController {
  static async listarQuadros(req, res) {
    try {
      const quadros = await Quadro.findAll();
      res.status(200).json(quadros);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao listar quadros` });
    }
  }

  static async cadastrarQuadro(req, res) {
    try {
      const novoQuadro = await Quadro.create(req.body);
      res.status(201).json({ message: "Quadro criado com sucesso!", quadro: novoQuadro });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar quadro` });
    }
  }

  static async buscarQuadroPorId(req, res) {
    try {
      const id = req.params.id;
      const quadro = await Quadro.findByPk(id);
      quadro ? res.status(200).json(quadro) : res.status(404).send("Quadro não encontrado");
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao buscar quadro` });
    }
  }

  static async atualizarQuadro(req, res) {
    try {
      const id = req.params.id;
      const [atualizou] = await Quadro.update(req.body, { where: { id } });
      if (atualizou) {
        const quadroAtualizado = await Quadro.findByPk(id);
        res.status(200).json({ message: "Quadro atualizado com sucesso", quadro: quadroAtualizado });
      } else {
        res.status(404).send("Quadro não encontrado");
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao atualizar quadro` });
    }
  }

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
