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
const usersTable = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
},{
  freezeTableName: true,
  timestamps: false
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
