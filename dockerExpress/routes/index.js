const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const auth = require('../middleware/auth');
const registerValidController = require('../controllers/registerValid');
const loginValidController = require('../controllers/loginValid');
const createController = require('../controllers/createContent.js');
const editContentController = require('../controllers/editContent');
const deleteContentController = require('../controllers/deleteContent');
const viewPostList = require('../controllers/viewPostList');
const logout = require('../controllers/logout');
const { body } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/board', auth, viewPostList);
router.get('/create', auth, (req, res) => {
  res.render(req.url.replace('/', ''), {username: req.username});
});
router.get('/logout', logout, (req, res) => {
  res.redirect('/');
});
router.get('/edit/:id', auth, editContentController.rootAccessControl.editRouting);
router.get('/delete/:id', auth, deleteContentController.rootAccessControl.delete);

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
  auth,
  createController.rootAccessControl.createContent
);
router.post(
  '/edit/:id',
  urlencodedParser,
  auth,
  editContentController.rootAccessControl.editContent
);

module.exports = router;
