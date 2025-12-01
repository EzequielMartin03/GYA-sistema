import {db} from "../database/connection.database.js";

export const AlumnoModel = {
  async findAll() {
    const result = await db.query("SELECT * FROM alumno ORDER BY id_alumno ASC");
    return result.rows;
  },

  async findByid_alumno(id_alumno) {
    const result = await db.query("SELECT * FROM alumno WHERE id_alumno = $1", [id_alumno]);
    return result.rows[0];
  },

  async create({ nombre, apellido, dni, fecha_nacimiento}) {
    const result = await db.query(
      `INSERT INTO alumno (nombre, apellido, dni, fecha_nacimiento)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, apellido, dni, fecha_nacimiento]
    );
    return result.rows[0];
  },

  async update(id_alumno, { nombre, apellido, dni, fecha_nacimiento }) {
    const result = await db.query(
      `UPDATE alumno
       SET nombre = $1, apellido = $2, dni = $3, fecha_nacimiento = $4
       WHERE id_alumno = $5 RETURNING *`,
      [nombre, apellido, dni, fecha_nacimiento, id_alumno]
    );
    return result.rows[0];
  },

  async delete(id_alumno) {
    const result = await db.query("DELETE FROM alumno WHERE id_alumno = $1 RETURNING *", [id_alumno]);
    return result.rows[0];
  },
};
