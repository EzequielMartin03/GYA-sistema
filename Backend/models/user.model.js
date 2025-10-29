import { db } from '../database/connection.database.js';

const create = async ({ nombre, contrasena }) => {
  const query = {
    text: `
      INSERT INTO usuario (nombre, contrasena)
      VALUES ($1, $2)
      RETURNING id_usuario, nombre
    `,
    values: [nombre, contrasena],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findOneByNombre = async (nombre) => {
  const query = {
    text: `
      SELECT * FROM usuario
      WHERE nombre = $1
    `,
    values: [nombre],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const UserModel = {
  create,
  findOneByNombre,
};
