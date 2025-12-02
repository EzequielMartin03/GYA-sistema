import { db } from "../database/connection.database.js"; 

export const UploadModel = {
    async create({ id_curso, titulo, descripcion, fecha_subida, link }) {
        const result = await db.query(
            `INSERT INTO material (id_curso, titulo, descripcion, fecha_subida, link)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [id_curso, titulo, descripcion, fecha_subida, link]
        );
        return result.rows[0];
    },

    async getById(id) {
        const result = await db.query(
            "SELECT * FROM material WHERE id_material = $1",
            [id]
        );
        return result.rows[0];
    },

    async delete(id) {
        const result = await db.query(
            "DELETE FROM material WHERE id_material = $1 RETURNING *",
            [id]
        );
        return result.rows[0]; 
    }
};
