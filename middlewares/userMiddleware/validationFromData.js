const { check, validationResult } = require("express-validator");
const People = require("../../models/user_model");
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");

const checkFromData = [
    check("name")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Only alphabets allowed")
        .trim(),

    check("email")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (value) => {
            const user = await People.findOne({ email: value });
            if (user) throw createError("Email already exists");
        }),

    check("password")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters and strong"),
];

const formDataValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    // delete uploaded file if validation fails
    if (req.file) {
        const filePath = path.join(
            __dirname,
            "../../public/avatars",
            req.file.filename
        );

        fs.unlink(filePath, (err) => {
            if (err) console.log("File delete failed:", err);
        });
    }

    return res.status(400).json({
        errors: errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
        })),
    });
};

module.exports = { checkFromData, formDataValidationHandler };
