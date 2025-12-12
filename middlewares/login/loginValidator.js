const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const loginValidators = [
    check("username").isLength({ min: 2 }).withMessage("Phone or email is required!"),
    check("password").isLength({ min: 1 }).withMessage("Pawword is required"),

];
const loginInValidatorHandler = function (req, res, next) {
    const error = validationResult(req);
    const mappedErrors = error.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.render("index", {
            data: req.body.username,
            errors: mappedErrors
        })
    }
}

module.exports = { loginValidators, loginInValidatorHandler };