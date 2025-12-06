const express = require('express');


const { getUser } = require('../controller/userController')
const decorateHtmlRes = require('../middlewares/common/decorateHtmlRes')
const imageUpload = require('../middlewares/userMiddleware/imageUploadMiddleware')
const checkFromData = require('../middlewares/userMiddleware/checkFromData')
const router = express.Router();

router.get('/users', decorateHtmlRes('Users'), getUser);

router.post('/uploader', imageUpload, checkFromData,(req, res) => {
    res.json({
        message: "Upload successful",
        file: req.file,
    });
});

module.exports = router;

