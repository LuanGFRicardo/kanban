import express from "express";
import ColunaController from "../controllers/colunasController.js";

const router = express.Router();

router.post("/", ColunaController.createColuna);
router.get("/", ColunaController.getAllColunas);
router.get("/:id", ColunaController.getColunaById);
router.put("/:id", ColunaController.updateColuna);
router.delete("/:id", ColunaController.deleteColuna);
router.get("/search/:nome", ColunaController.searchColunaByNome); // nova rota de busca

export default router;
