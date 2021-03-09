var express = require('express');
var router = express.Router();
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

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('select * from users;', (err, users) => {
    console.log('---------------------');
    console.log(users);
    console.log('---------------------');
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
