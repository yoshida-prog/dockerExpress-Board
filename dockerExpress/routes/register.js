const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const registerValidController = require('../controllers/registerValid');
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.post(
  'register',
  urlencodedParser,
  registerValidController.rootAccessControl.validCheck,
  registerValidController.rootAccessControl.validResult
);

module.exports = router;
