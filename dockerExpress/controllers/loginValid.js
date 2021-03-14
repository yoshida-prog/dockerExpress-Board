const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');
const bcrypt = require('bcrypt');

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
      db.User.findOne({
        where: {
          email
        }
      }).then(async (results) => {
        if (!results) {
          const loginErrorMessage2 = 'メールアドレスまたはパスワードが間違っています';
          res.render('index', {
              err: loginErrorMessage2
          });
        } else {
          const username = results.name;
          const queryEmail = results.email;
          const hashedPassword = results.password;
          const compared = await bcrypt.compare(password, hashedPassword);
          if (queryEmail === email && compared === true) {
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
