import { Router } from "express";
import { AlumnoController } from "../controllers/alumno.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router();

router.get("/", verifyToken, AlumnoController.listarAlumnos);
router.get("/:id_alumno", verifyToken, AlumnoController.obtenerAlumno);
router.post("/", verifyToken, AlumnoController.crearAlumno);
router.put("/:id_alumno", verifyToken, AlumnoController.editarAlumno);
router.delete("/:id_alumno", verifyToken, AlumnoController.eliminarAlumno);

export default router;
