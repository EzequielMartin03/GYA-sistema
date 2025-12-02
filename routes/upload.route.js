import { Router } from "express";
import upload from "../services/upload.service.js";
import { uploadRouter } from "../controllers/upload.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router();

router.post("/subir", verifyToken, upload.single("archivo"), uploadRouter.subirMaterial);


export default router;
