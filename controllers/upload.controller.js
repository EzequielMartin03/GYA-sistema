import { UploadModel } from "../models/uploads.model.js";

export const subirMaterial = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se subió ningún archivo" });
        }

        const { curso_id, titulo, descripcion } = req.body;

        const nuevoMaterial = await UploadModel.create({
            id_curso: curso_id,
            titulo,
            descripcion: descripcion || null,
            fecha_subida: new Date(),
            link: `materiales/${req.file.filename}` 
        });

        res.json({
            message: "Archivo subido correctamente",
            material: nuevoMaterial
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al subir el archivo" });
    }
};

export const eliminarMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        const material = await UploadModel.getById(id);

        if (!material) {
            return res.status(404).json({ error: "El material no existe" });
        }

        const rutaArchivo = path.join("uploads/materiales", material.link.replace("materiales/", ""));

        fs.unlink(rutaArchivo, async (err) => {
            if (err) {
                console.log("No se pudo eliminar el archivo físico:", err.message);
            }

            await UploadModel.delete(id);

            res.json({ message: "Material eliminado correctamente" });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al eliminar el material" });
    }
};

export const uploadRouter = {
    subirMaterial,
    eliminarMaterial
};

