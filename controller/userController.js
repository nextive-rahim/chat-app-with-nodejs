const bcrypt = require("bcrypt");
const User = require("../models/user_model");
const fs = require("fs");
const path = require("path");
async function getUser(req, res, next) {
    try {
        const users = await User.find().lean();
        res.render("users", { title: res.locals.title, users: users });
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
// ----- DELETE USER -----
async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;
        const deleted = await User.findByIdAndDelete(userId);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (deleted.avatar) {
            const filePath = path.join(
                __dirname,
                "../../public/avatars",
                deleted.avatar
            );

            fs.unlink(filePath, (err) => {
                if (err) console.log("File delete failed:", err);
            });
        }
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = { getUser, adduser, deleteUser };
