import express from "express";
import QuadroController from "../controllers/quadrosController.js";

const router = express.Router();

router.get("/", QuadroController.listarQuadros);
router.get("/:id", QuadroController.buscarQuadroPorId);
router.post("/", QuadroController.cadastrarQuadro);
router.put("/:id", QuadroController.atualizarQuadro);
router.delete("/:id", QuadroController.deletarQuadro);

export default router;
