import {db} from "../database/connection.database.js";

export const ProfesorModel = {
  async findAll() {
    const result = await db.query("SELECT * FROM profesor ORDER BY id_profesor ASC");
    return result.rows;
  },

  async findByid_profesor(id_profesor) {
    const result = await db.query("SELECT * FROM profesor WHERE id_profesor = $1", [id_profesor]);
    return result.rows[0];
  },

  async create({ nombre, apellido, dni, telefono, email }) {
    const result = await db.query(
      `INSERT INTO profesor (nombre, apellido, dni, telefono, email)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, apellido, dni,telefono, email]
    );
    return result.rows[0];
  },

  async update(id_profesor, { nombre, apellido, dni, telefono, email }) {
    const result = await db.query(
      `UPDATE profesor
       SET nombre = $1, apellido = $2, dni = $3, telefono = $4, email = $5
       WHERE id_profesor = $6 RETURNING *`,
      [nombre, apellido, dni, telefono, email, id_profesor]
    );
    return result.rows[0];
  },

  async delete(id_profesor) {
    const result = await db.query("DELETE FROM profesor WHERE id_profesor = $1 RETURNING *", [id_profesor]);
    return result.rows[0];
  },
};
