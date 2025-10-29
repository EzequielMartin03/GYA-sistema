import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

// Registro de usuario
const register = async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;

    if (!nombre || !contrasena) {
      return res.status(400).json({ ok: false, msg: "Faltan datos" });
    }

    // Verificar si ya existe el usuario
    const existingUser = await UserModel.findOneByNombre(nombre);
    if (existingUser) {
      return res.status(409).json({ ok: false, msg: "El usuario ya existe" });
    }

    // Hashear contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(contrasena, salt);

    // Crear usuario
    const newUser = await UserModel.create({
      nombre,
      contrasena: hashedPassword,
    });

    return res.status(201).json({
      ok: true,
      msg: "Usuario registrado correctamente",
      usuario: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;

    if (!nombre || !contrasena) {
      return res.status(400).json({ ok: false, msg: "Faltan datos" });
    }

    // Buscar usuario
    const user = await UserModel.findOneByNombre(nombre);

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcryptjs.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      ok: true,
      msg: "Login exitoso",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

export const UserController = {
  register,
  login,
};
