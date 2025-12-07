const bcript = require('bcrypt')
const User=require('../models/people_model')
function getUser(req, res, next) {
    res.render('users', {
        "title": res.locals.title
    })
}

async function adduser(req, res, next) {
    let newUser;
    const hasPassword = await bcript.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hasPassword,
        })
    } else {
        newUser = new User({
            ...req.body,

            password: hasPassword,
        });
    }

    try {
        const result = await newUser.save();
        res.status(200).json({ message: "User Added successfully" })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    mess: "unknown error occourced!"
                }
            }
        })
    }
}

module.exports = { getUser ,adduser};