const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
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
  validResult: (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    if (!password || !email) {
      const loginErrorMessage1 = 'メールアドレスもしくはパスワードが入力されていません';
      res.render('index', {
        err: loginErrorMessage1
      });
    } else {
      const columns = ['name', 'email', 'password']
      connection
        .query(
            'select ?? from ?? where email = ? and password = ?',
            [columns, 'users', email, password],
            (err, results, fields) => {
                if (!results[0]) {
                    const loginErrorMessage2 = 'メールアドレスまたはパスワードが間違っています';
                    res.render('index', {
                        err: loginErrorMessage2
                    });
                } else {
                    const username = results[0].name;
                    const queryEmail = results[0].email;
                    const queryPassword = results[0].password;
                    if (queryEmail === email && queryPassword === password) {
                        const payload = {
                            username: username
                        };
                        const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
                        res.cookie('token', token, {maxAge: 3600000});
                        res.redirect('/board');
                    } else {
                        const loginErrorMessage2 = 'メールアドレスまたはパスワードが間違っています';
                        res.render('index', {
                            err: loginErrorMessage2
                        });
                    }
                } 
      });
    }
  }
}
