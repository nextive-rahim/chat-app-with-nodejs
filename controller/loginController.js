const User = require("../models/user_model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function getLogin(req, res, next) {
    res.render("index", {
        title: res.locals.title,
        errors: {},
        data: {}
    });
}

async function login(req, res, next) {
    try {
        const user = await User.findOne({
            $or: [
                { email: req.body.username },
                { mobile: req.body.username }
            ]
        });

        if (!user) {
            throw createError('Invalid username or password!');
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            throw createError('Invalid username or password!');
        }

        const userObject = {
            username: user.name,
            mobile: user.mobile,
            email: user.email,
            role: "user"
        };

        const token = jwt.sign(
            userObject,
            process.env.JWT_Secret,
            { expiresIn: process.env.JWT_EXPIRY }
        );

        res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.JWT_EXPIRY,
            httpOnly: true,
            signed: true,
        });

        res.locals.loggedInUser = userObject;

        return res.render("inbox");

    } catch (error) {
        return res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    message: error.message
                }
            }
        });
    }
}

function logout(req,res) {
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('Logout');
}
module.exports = { getLogin, login ,logout};
