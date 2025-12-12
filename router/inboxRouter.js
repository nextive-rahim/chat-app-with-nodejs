const express = require('express');
const { getInbox } = require('../controller/inboxContoller')
const decorateHtmlRes = require('../middlewares/common/decorateHtmlRes')
const checkLogin = require('../middlewares/common/checkLogIn')
const router = express.Router();
const app = express();

router.get('/inbox', decorateHtmlRes('Inbox'), checkLogin, getInbox)
module.exports = router;

