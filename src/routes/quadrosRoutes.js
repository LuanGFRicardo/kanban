import express from "express";
import QuadroController from "../controllers/quadrosController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Aplica o middleware em todas as rotas
router.post("/", authMiddleware, QuadroController.createQuadro);
router.get("/search/:nome", authMiddleware, QuadroController.searchQuadroByNome); // ✅ mover antes
router.get("/", authMiddleware, QuadroController.getAllQuadros);
router.get("/:id", authMiddleware, QuadroController.getQuadroById);
router.put("/:id", authMiddleware, QuadroController.updateQuadro);
router.delete("/:id", authMiddleware, QuadroController.deleteQuadro);

export default router;
