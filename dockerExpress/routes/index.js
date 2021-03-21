const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = require('../app');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');
const registerValidController = require('../controllers/registerValid');
const loginValidController = require('../controllers/loginValid');
const createController = require('../controllers/createContent.js');
const editContentController = require('../controllers/editContent');
const deleteContentController = require('../controllers/deleteContent');
const authenticate = require('../controllers/authenticate');
const viewPostList = require('../controllers/viewPostList');
const logout = require('../controllers/logout');
const { body } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get('/', async(req, res, next) => {
  res.render('index');
});
router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/board', viewPostList);
router.get('/create', authenticate);
router.get('/logout', logout, (req, res) => {
  res.redirect('/');
});
router.get('/edit/:id', editContentController.rootAccessControl.editRouting);
router.get('/delete/:id', deleteContentController.rootAccessControl.delete);

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
router.post(
  '/create',
  urlencodedParser,
  createController.rootAccessControl.createContent
);
router.post(
  '/edit/:id',
  urlencodedParser,
  editContentController.rootAccessControl.editContent
);

module.exports = router;
