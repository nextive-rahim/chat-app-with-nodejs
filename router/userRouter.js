const express = require('express');

const imageUpload = require('../middlewares/userMiddleware/imageUploadMiddleware')
const { getUser, ç, adduser } = require('../controller/userController');
const decorateHtmlRes = require('../middlewares/common/decorateHtmlRes');
const { checkFromData, formDataValidationHandler } = require('../middlewares/userMiddleware/validationFromData');

const router = express.Router();

// GET users
router.get('/users', decorateHtmlRes('Users'), getUser);

// POST uploader with validation
router.post(
    '/uploader', imageUpload,
    checkFromData,              // Validate
    formDataValidationHandler,  // Handle validation result
    adduser,

);


module.exports = router;
