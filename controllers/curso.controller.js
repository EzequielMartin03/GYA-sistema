import { CursoModel } from "../models/curso.model.js";
import { CursoHorarioModel } from "../models/curso_horario.model.js";

const listarCursos = async (req, res) => {
  try {
    const cursos = await CursoModel.findAll();
    return res.json({ ok: true, cursos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

const obtenerCurso = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const curso = await CursoModel.findById(id_curso);

    if (!curso) {
      return res.status(404).json({ ok: false, msg: "Curso no encontrado" });
    }

    const horarios = await CursoHorarioModel.findByCurso(id_curso);
    return res.json({ ok: true, curso, horarios });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

const crearCurso = async (req, res) => {
  try {
    const { nombre, anio_lectivo, nivel } = req.body;

    if (!nombre || !anio_lectivo || !nivel) {
      return res
        .status(400)
        .json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const nuevoCurso = await CursoModel.create({ nombre, anio_lectivo, nivel });
    return res.status(201).json({ ok: true, curso: nuevoCurso });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

const editarCurso = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const cursoActualizado = await CursoModel.update(id_curso, req.body);

    if (!cursoActualizado) {
      return res.status(404).json({ ok: false, msg: "Curso no encontrado" });
    }

    return res.json({ ok: true, curso: cursoActualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

const eliminarCurso = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const cursoEliminado = await CursoModel.delete(id_curso);

    if (!cursoEliminado) {
      return res.status(404).json({ ok: false, msg: "Curso no encontrado" });
    }

    return res.json({ ok: true, msg: "Curso eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

const listarAlumnosPorCurso = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const alumnos = await CursoModel.findAlumnosByCurso(id_curso);

    if (alumnos.length === 0) {
      return res
        .status(404)
        .json({ ok: false, msg: "No hay alumnos inscriptos en este curso" });
    }

    return res.json({ ok: true, alumnos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

const inscribirAlumno = async (req, res) => {
  try {
    const { id_alumno, id_curso } = req.body;

    if (!id_alumno || !id_curso) {
      return res
        .status(400)
        .json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const nuevaInscripcion = await CursoModel.inscribirAlumno({
      id_alumno,
      id_curso,
    });
    return res.status(201).json({ ok: true, inscripcion: nuevaInscripcion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

const eliminarInscripcion = async (req, res) => {
  try {
    const { id_alumno, id_curso } = req.params;

    const inscripcionEliminada = await CursoModel.eliminarInscripcion(
      id_alumno,
      id_curso
    );

    if (!inscripcionEliminada) {
      return res
        .status(404)
        .json({ ok: false, msg: "Inscripción no encontrada" });
    }

    return res.json({ ok: true, msg: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

export const CursoController = {
  listarCursos,
  obtenerCurso,
  crearCurso,
  editarCurso,
  eliminarCurso,
  listarAlumnosPorCurso,
  inscribirAlumno,
  eliminarInscripcion,
};
