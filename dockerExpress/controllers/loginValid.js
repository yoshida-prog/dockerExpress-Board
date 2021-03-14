const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

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
      const columns = ['name', 'email', 'password'];
      db.User.findOne({
        where: {
          email,
          password
        }
      }).then(results => {
        if (!results) {
          const loginErrorMessage2 = 'メールアドレスまたはパスワードが間違っています';
          res.render('index', {
              err: loginErrorMessage2
          });
        } else {
          const username = results.name;
          const queryEmail = results.email;
          const queryPassword = results.password;
          if (queryEmail === email && queryPassword === password) {
              const payload = {
                  username
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
      }).catch(err => {
        res.status(500).send(err);
      });
    }
  }
}
