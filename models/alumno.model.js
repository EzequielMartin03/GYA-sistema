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

  async create({ nombre, apellido, dni }) {
    const result = await db.query(
      `INSERT INTO alumno (nombre, apellido, dni)
       VALUES ($1, $2, $3) RETURNING *`,
      [nombre, apellido, dni]
    );
    return result.rows[0];
  },

  async update(id_alumno, { nombre, apellido, dni }) {
    const result = await db.query(
      `UPDATE alumno
       SET nombre = $1, apellido = $2, dni = $3
       WHERE id_alumno = $4 RETURNING *`,
      [nombre, apellido, dni, id_alumno]
    );
    return result.rows[0];
  },

  async delete(id_alumno) {
    const result = await db.query("DELETE FROM alumno WHERE id_alumno = $1 RETURNING *", [id_alumno]);
    return result.rows[0];
  },
};
