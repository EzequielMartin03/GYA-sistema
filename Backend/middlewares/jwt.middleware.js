import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  token = token.split(" ")[1];

  try {
    const { id_usuario, nombre } = jwt.verify(token, process.env.JWT_SECRET);
    req.id_usuario = id_usuario;
    req.nombre = nombre;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Token inválido o expirado" });
  }
};
