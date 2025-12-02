import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/materiales");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        cb(null, name);
    }
});

const upload = multer({ storage });

export default upload;
