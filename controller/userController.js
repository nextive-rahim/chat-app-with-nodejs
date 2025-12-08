const bcrypt = require("bcrypt");
const User = require("../models/user_model");

async function getUser(req, res, next) {
  try {
    const users = await User.find().lean(); 
    res.render("users", { title: res.locals.title,users: users });
  } catch (error) {
    next(error);
  }
}


async function adduser(req, res, next) {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let avatarFile = req.files && req.files.length > 0
      ? req.files[0].filename
      : null;

    let newUser = new User({
      ...req.body,
      avatar: avatarFile,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User added successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = { getUser, adduser };
