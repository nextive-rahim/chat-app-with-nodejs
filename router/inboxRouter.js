const express = require('express');
const {getInbox} = require('../controller/inboxContoller')
const decorateHtmlRes = require('../middlewares/common/decorateHtmlRes')
const router = express.Router();
const app = express();

router.get('/inbox',decorateHtmlRes('Inbox'), getInbox)
module.exports = router;

