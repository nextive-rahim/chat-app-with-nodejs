const express = require("express");
const router = express.Router();

const { getUser, adduser ,deleteUser} = require("../controller/userController");
const imageUpload = require("../middlewares/user/imageUploadMiddleware");
const {
    checkFromData,
    formDataValidationHandler,
} = require("../middlewares/user/validationFromData");

// show page
router.get("/users", getUser);

// add user
router.post(
    "/users",
    imageUpload,                // upload file first
    checkFromData,              // then validate all fields
    formDataValidationHandler,  // return validation errors
    adduser                     // finally save user
);
router.delete("/users/:id", deleteUser);
module.exports = router;
