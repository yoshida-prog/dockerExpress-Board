const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
  validCheck: [
    check('username', '名前を入力してください')
      .exists(),
    check('email', 'メールアドレスの形式で入力してください')
      .isEmail()
      .normalizeEmail(),
    check('password', 'パスワードは７文字以上で入力してください')
      .isLength({ min: 7 })
      .custom((value, { req }) => {
        if (req.body.password !== req.body.confirmPassword) {
          throw new Error('入力したパスワードと確認用のパスワードが一致しません');
        }
        return true;
      })
  ],
  validResult: (req, res) => {
    const errors = validationResult(req);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body['email'];
    if (!errors.isEmpty()) {
      const errors_array = errors.array();
      res.render('register', {
        errors_array,
        username,
        email,
      });
    } else {
      db.User.create({
        name: username,
        email,
        password
      }).then(() => {
        const payload = {
          username
        };
        const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
        res.cookie('token', token, {maxAge: 3600000});
        res.redirect('/board');
      }).catch(err => {
        res.status(500).send(err);
      });
    }
  }
}
