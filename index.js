import "dotenv/config";
import express from "express";

import userRouter from "./routes/user.route.js";
import alumnoRouter from "./routes/alumno.route.js";
import profesorRouter from "./routes/profesor.route.js";
import cursoRouter from "./routes/curso.route.js";
import uploadRouter from "./routes/upload.route.js";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/alumnos", alumnoRouter);
app.use("/api/v1/profesores", profesorRouter);
app.use("/api/v1/cursos", cursoRouter);
app.use("/api/v1/uploads", uploadRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor andando en " + PORT));
