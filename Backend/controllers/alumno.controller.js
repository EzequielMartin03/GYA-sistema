import { AlumnoModel } from "../models/alumno.model.js";

const listarAlumnos = async (req, res) => {
  try {
    const alumnos = await AlumnoModel.findAll();
    return res.json({ ok: true, alumnos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const obtenerAlumno = async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const alumno = await AlumnoModel.findByid_alumno(id_alumno);

    if (!alumno) {
      return res.status(404).json({ ok: false, msg: "Alumno no encontrado" });
    }

    return res.json({ ok: true, alumno });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const crearAlumno = async (req, res) => {
  try {
    const { nombre, apellido, dni } = req.body;

    if (!nombre || !apellido || !dni) {
      return res
        .status(400)
        .json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const nuevoAlumno = await AlumnoModel.create({
      nombre,
      apellido,
      dni,
    });

    return res.status(201).json({ ok: true, alumno: nuevoAlumno });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const editarAlumno = async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const alumnoActualizado = await AlumnoModel.update(id_alumno, req.body);

    if (!alumnoActualizado) {
      return res.status(404).json({ ok: false, msg: "Alumno no encontrado" });
    }

    return res.json({ ok: true, alumno: alumnoActualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const eliminarAlumno = async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const alumnoEliminado = await AlumnoModel.delete(id_alumno);

    if (!alumnoEliminado) {
      return res.status(404).json({ ok: false, msg: "Alumno no encontrado" });
    }

    return res.json({ ok: true, msg: "Alumno eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

export const AlumnoController = {
  listarAlumnos,
  obtenerAlumno,
  crearAlumno,
  editarAlumno,
  eliminarAlumno,
};
