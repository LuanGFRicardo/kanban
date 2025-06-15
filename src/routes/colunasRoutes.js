import express from "express";
import ColunaController from "../controllers/colunasController.js";

const router = express.Router();

router.get("/", ColunaController.listarColunas);
router.get("/:id", ColunaController.buscarColunaPorId);
router.post("/", ColunaController.cadastrarColuna);
router.put("/:id", ColunaController.atualizarColuna);
router.delete("/:id", ColunaController.deletarColuna);

export default router;
