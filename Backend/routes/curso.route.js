import { Router } from "express";
import { CursoController } from "../controllers/curso.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router();

// Gestión de cursos
router.get("/", verifyToken, CursoController.listarCursos);
router.get("/:id_curso", verifyToken, CursoController.obtenerCurso);
router.post("/", verifyToken, CursoController.crearCurso);
router.put("/:id_curso", verifyToken, CursoController.editarCurso);
router.delete("/:id_curso", verifyToken, CursoController.eliminarCurso);

// Gestión de inscripciones
router.get("/:id_curso/alumnos", verifyToken, CursoController.listarAlumnosPorCurso);
router.post("/inscribir", verifyToken, CursoController.inscribirAlumno);
router.delete("/inscribir/:id_alumno/:id_curso", verifyToken, CursoController.eliminarInscripcion);

export default router;
