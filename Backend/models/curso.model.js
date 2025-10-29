import { db } from "../database/connection.database.js";

export const CursoModel = {
  async findAll() {
    const result = await db.query("SELECT * FROM curso ORDER BY id_curso ASC");
    return result.rows;
  },

  async findById(id_curso) {
    const result = await db.query(
      "SELECT * FROM curso WHERE id_curso = $1",
      [id_curso]
    );
    return result.rows[0];
  },

  async create({ nombre, anio_lectivo, nivel }) {
    const result = await db.query(
      `INSERT INTO curso (nombre, anio_lectivo, nivel)
       VALUES ($1, $2, $3) RETURNING *`,
      [nombre, anio_lectivo, nivel]
    );
    return result.rows[0];
  },

  async update(id_curso, { nombre, anio_lectivo, nivel }) {
    const result = await db.query(
      `UPDATE curso
       SET nombre = $1, anio_lectivo = $2, nivel = $3
       WHERE id_curso = $4 RETURNING *`,
      [nombre, anio_lectivo, nivel, id_curso]
    );
    return result.rows[0];
  },

  async delete(id_curso) {
    const result = await db.query(
      "DELETE FROM curso WHERE id_curso = $1 RETURNING *",
      [id_curso]
    );
    return result.rows[0];
  },
  async findAlumnosByCurso(id_curso) {
    const query = `
      SELECT a.id_alumno, a.nombre, a.apellido, a.dni, ac.fecha_alta
      FROM alumno_curso ac
      INNER JOIN alumno a ON a.id_alumno = ac.id_alumno
      WHERE ac.id_curso = $1
      ORDER BY a.apellido, a.nombre
    `;
    const { rows } = await db.query(query, [id_curso]);
    return rows;
  },

  // Inscribir un alumno a un curso
  async inscribirAlumno({ id_alumno, id_curso }) {
    const query = `
      INSERT INTO alumno_curso (id_alumno, id_curso)
      VALUES ($1, $2)
      RETURNING *
    `;
    const { rows } = await db.query(query, [id_alumno, id_curso]);
    return rows[0];
  },

  // Eliminar inscripción de un alumno
  async eliminarInscripcion(id_alumno, id_curso) {
    const query = `
      DELETE FROM alumno_curso
      WHERE id_alumno = $1 AND id_curso = $2
      RETURNING *
    `;
    const { rows } = await db.query(query, [id_alumno, id_curso]);
    return rows[0];
  }
};
