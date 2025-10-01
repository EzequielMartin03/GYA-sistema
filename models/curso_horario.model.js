import { db } from "../database/connection.database.js";

export const CursoHorarioModel = {
  async findByCurso(id_curso) {
    const query = `
      SELECT ch.id_curso, d.nombre_dia, ch.hora_inicio, ch.hora_fin
      FROM curso_horario ch
      JOIN dia d ON ch.id_dia = d.id_dia
      WHERE ch.id_curso = $1
      ORDER BY d.id_dia, ch.hora_inicio;
    `;
    const result = await db.query(query, [id_curso]);
    return result.rows;
  },

  async addHorario({ id_curso, id_dia, hora_inicio, hora_fin }) {
    const query = `
      INSERT INTO curso_horario (id_curso, id_dia, hora_inicio, hora_fin)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const result = await db.query(query, [id_curso, id_dia, hora_inicio, hora_fin]);
    return result.rows[0];
  },

  async deleteHorario({ id_curso, id_dia, hora_inicio }) {
    const query = `
      DELETE FROM curso_horario
      WHERE id_curso = $1 AND id_dia = $2 AND hora_inicio = $3
      RETURNING *;
    `;
    const result = await db.query(query, [id_curso, id_dia, hora_inicio]);
    return result.rows[0];
  }
};
