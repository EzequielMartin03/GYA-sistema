import { db } from "../database/connection.database.js";

export const CondicionMedicaModel = {

  async crearCondicionMedica(data) {
    const {
      alergias,
      operaciones,
      sangrado_de_nariz,
      baja_presion,
      alta_presion,
      PAF_Asma,
      deficit_de_atencion,
      diabetes,
      celiaquia,
      otros
    } = data;

    const result = await db.query(
      `INSERT INTO condicion_medica (
        alergias, operaciones, sangrado_de_nariz, baja_presion, alta_presion,
        PAF_Asma, deficit_de_atencion, diabetes, celiaquia, otros
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        alergias, operaciones, sangrado_de_nariz, baja_presion, alta_presion,
        PAF_Asma, deficit_de_atencion, diabetes, celiaquia, otros
      ]
    );

    return result.rows[0];
  },

  async actualizarCondicion(id, data) {
    const {
      alergias,
      operaciones,
      sangrado_de_nariz,
      baja_presion,
      alta_presion,
      PAF_Asma,
      deficit_de_atencion,
      diabetes,
      celiaquia,
      otros
    } = data;

    const result = await db.query(
      `UPDATE condicion_medica
       SET alergias=$1, operaciones=$2, sangrado_de_nariz=$3, baja_presion=$4,
           alta_presion=$5, PAF_Asma=$6, deficit_de_atencion=$7, diabetes=$8,
           celiaquia=$9, otros=$10
       WHERE id_condicion_medica=$11
       RETURNING *`,
      [
        alergias, operaciones, sangrado_de_nariz, baja_presion, alta_presion,
        PAF_Asma, deficit_de_atencion, diabetes, celiaquia, otros, id
      ]
    );

    return result.rows[0];
  },

  async relacionAlumnoCondicion(id_alumno, id_condicion_medica) {
    return await db.query(
      `INSERT INTO alumno_condicion_medica (id_alumno, id_condicion_medica)
       VALUES ($1, $2)
       RETURNING *`,
      [id_alumno, id_condicion_medica]
    );
  },

  async obtenerPorAlumno(id_alumno) {
    const result = await db.query(
      `SELECT cm.*
       FROM condicion_medica cm
       JOIN alumno_condicion_medica acm ON acm.id_condicion_medica = cm.id_condicion_medica
       WHERE acm.id_alumno = $1`,
      [id_alumno]
    );

    return result.rows[0] || null;
  }
};
