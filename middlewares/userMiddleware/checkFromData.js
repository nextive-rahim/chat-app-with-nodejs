const { check } = require('express-validator')
const People = require('../../models/people_model')
const creatError = require('http-errors')
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
        })
    ]
module.exports = checkFromData