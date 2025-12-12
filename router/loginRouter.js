const express = require('express');
const { getLogin, login, logout } = require('../controller/loginController')
const decorateHtmlRes = require('../middlewares/common/decorateHtmlRes')
const redirectIfLoggedIn = require('../middlewares/common/redirectLoggedIn')
const {
    loginValidators,
    loginInValidatorHandler,
} = require("../middlewares/login/loginValidator");
const router = express.Router();
const app = express();


router.get('/', redirectIfLoggedIn, decorateHtmlRes('Login'), getLogin);
router.post('/', decorateHtmlRes('Login'), loginValidators, loginInValidatorHandler, login);

router.get("/logout", (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    return res.redirect("/");
});
module.exports = router;

