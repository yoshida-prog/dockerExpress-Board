const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'my_mysql_db',
  host: 'my_mysql'
});

connection.connect((err) => {
    if (err) {
        console.log('error connectiong: ' + err.stack);
        return;
    }
    console.log('success');
});

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
    const username = req.body['username'];
    const password = req.body['password'];
    // emailフォームが空の場合に送信するとなぜか@のみvalueに格納されているので以下の４行の処理を行う
    let email = req.body['email'];
    if (email === '@') {
      email = '';
    }
    if (!errors.isEmpty()) {
      const errors_array = errors.array();
      res.render('register', {
        errors_array,
        username,
        email,
      });
    } else {
      connection.query('insert into users set ?', {name: username, email: email, password: password}, (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        res.render('board');
      });
    }
  }
}
