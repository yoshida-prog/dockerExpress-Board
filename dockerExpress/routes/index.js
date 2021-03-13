const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = require('../app');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');
const registerValidController = require('../controllers/registerValid');
const loginValidController = require('../controllers/loginValid');
const authenticate = require('../controllers/authenticate');
const logout = require('../controllers/logout');
const { body } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/board', authenticate);

router.get('/logout', logout, (req, res) => {
  res.redirect('/');
});

router.post(
  '/register',
  urlencodedParser,
  registerValidController.rootAccessControl.validCheck,
  registerValidController.rootAccessControl.validResult
);

router.post(
  '/index',
  urlencodedParser,
  loginValidController.rootAccessControl.validResult
);

module.exports = router;
