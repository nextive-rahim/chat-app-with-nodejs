const path = require("path");
const multer = require("multer");
const createError = require("http-errors");
const fs = require("fs");

function uploader(folderName, allowedTypes, fileSizeLimit, errorMessage) {
    const uploadFolder = path.join(__dirname, `../public/${folderName}`);

    // ensure folder exists
    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadFolder);
        },

        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = file.originalname
                .replace(ext, "")
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase();

            const finalName = `${name}-${Date.now()}${ext}`;
            cb(null, finalName);
        },
    });

    const upload = multer({
        storage,
        limits: { fileSize: fileSizeLimit },
        fileFilter: (req, file, cb) => {
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(errorMessage));
            }
        },
    });

    return upload;
}

module.exports = uploader;
