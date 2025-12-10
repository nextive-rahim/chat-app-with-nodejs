const express = require('express');
const {getLogin,login} = require('../controller/loginController')
const decorateHtmlRes = require('../middlewares/common/decorateHtmlRes')
const {
    loginValidators,
    loginInValidatorHandler,
} = require("../middlewares/login/loginValidator");
const router = express.Router();
const app = express();


router.get('/',decorateHtmlRes('Login'), getLogin);
router.post('/',decorateHtmlRes('Login'),loginValidators,loginInValidatorHandler, login);
module.exports = router;

