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
        // Hash the password
        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Single file upload populates req.file
        let avatarFile = req.file ? req.file.filename : null;

        // Create new user
        let newUser = new User({
            ...req.body,
            avatar: avatarFile,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "User added successfully",
            user: newUser, // send back for frontend
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
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
            const filePath = path.join(__dirname, "../public/avatars", deleted.avatar);
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(filePath, (err) => {
                        if (err) console.log("File delete failed:", err);
                        else console.log("Avatar deleted:", deleted.avatar);
                    });
                } else {
                    console.log("Avatar file does not exist:", deleted.avatar);
                }
            });
        }

        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getUser, adduser, deleteUser };
