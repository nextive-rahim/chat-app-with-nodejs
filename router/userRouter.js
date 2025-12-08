const express = require("express");
const router = express.Router();

const { getUser, adduser } = require("../controller/userController");
const imageUpload = require("../middlewares/userMiddleware/imageUploadMiddleware");
const {
    checkFromData,
    formDataValidationHandler,
} = require("../middlewares/userMiddleware/validationFromData");

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

module.exports = router;
