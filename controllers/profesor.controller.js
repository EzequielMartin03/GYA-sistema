import { ProfesorModel } from "../models/profesor.model.js";

const listarprofesores = async (req, res) => {
  try {
    const profesors = await ProfesorModel.findAll();
    return res.json({ ok: true, profesors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const obtenerprofesor = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const profesor = await ProfesorModel.findByid_profesor(id_profesor);

    if (!profesor) {
      return res.status(404).json({ ok: false, msg: "profesor no encontrado" });
    }

    return res.json({ ok: true, profesor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const crearprofesor = async (req, res) => {
  try {
    const { nombre, apellido, dni, telefono, email } = req.body;

    if (!nombre || !apellido || !dni || !telefono || !email) {
      return res
        .status(400)
        .json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const nuevoprofesor = await ProfesorModel.create({
      nombre,
      apellido,
      dni,
      telefono,
      email
    });

    return res.status(201).json({ ok: true, profesor: nuevoprofesor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const editarprofesor = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const profesorActualizado = await ProfesorModel.update(id_profesor, req.body);

    if (!profesorActualizado) {
      return res.status(404).json({ ok: false, msg: "profesor no encontrado" });
    }

    return res.json({ ok: true, profesor: profesorActualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const eliminarprofesor = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const profesorEliminado = await ProfesorModel.delete(id_profesor);

    if (!profesorEliminado) {
      return res.status(404).json({ ok: false, msg: "profesor no encontrado" });
    }

    return res.json({ ok: true, msg: "profesor eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

export const ProfesorController = {
  listarprofesores,
  obtenerprofesor,
  crearprofesor,
  editarprofesor,
  eliminarprofesor,
};
