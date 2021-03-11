const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = require('../app');
const registerValidController = require('../controllers/registerValid');
const loginValidController = require('../controllers/loginValid');
const authenticate = require('../controllers/authenticate');
const logout = require('../controllers/logout');
const { body } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('my_mysql_db', 'root', 'root', {
  host: 'my_mysql',
  dialect: 'mysql',
});

/* GET home page. */
router.get('/', async(req, res, next) => {
  try {
    await sequelize.authenticate();
    await sequelize.query('select * from users').then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
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
