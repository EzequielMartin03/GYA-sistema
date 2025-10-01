import { Router } from "express";
import { ProfesorController } from "../controllers/profesor.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router();

router.get("/", verifyToken, ProfesorController.listarprofesores);
router.get("/:id_profesor", verifyToken, ProfesorController.obtenerprofesor);
router.post("/", verifyToken, ProfesorController.crearprofesor);
router.put("/:id_profesor", verifyToken, ProfesorController.editarprofesor);
router.delete("/:id_profesor", verifyToken, ProfesorController.eliminarprofesor);

export default router;
