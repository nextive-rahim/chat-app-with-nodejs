const { check } = require('express-validator')
const { validationResult } = require('express-validator');
const People = require('../../models/people_model')
const creatError = require('http-errors')
const { unlink } = require('fs');
const path = require('path');
const checkFromData =
    [
        check('name').isLength({ min: 2 }).withMessage('Name is required').isAlpha("en-US", { ignore: " -" }).withMessage('Alpabet numical symble not allow').trim(),

        check('email').isEmail().withMessage('Invalid Email').trim().custom(async (value) => {
            try {
                const user = await People.findOne({ email: value })
                if (user) {
                    throw creatError("Email already exist");
                }
            } catch (error) {
                throw creatError(error.message)
            }
        }),

        check('password').isStrongPassword().withMessage('Password must be 8 digits ')
    ]

/// Validation Result

const formDataValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    }
    // If validation fails
    if (!errors.isEmpty()) {
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(path.join(__dirname, '../../public/avatars', filename), (err) => {
                if (err) console.error("Failed to delete file:", err);
            });
        }

        const formattedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return res.status(400).json({ errors: formattedErrors });
    }

    // If validation successful
    res.status(200).json({
        message: "Upload successful",
        file: req.file,
    });
};
module.exports = { checkFromData, formDataValidationHandler }