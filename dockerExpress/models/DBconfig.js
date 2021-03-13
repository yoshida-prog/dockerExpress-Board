const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('my_mysql_db', 'root', 'root', {
    host: 'my_mysql',
    dialect: 'mysql',
  });
const User = sequelize.define('users', {
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

module.exports = {
    sequelize: sequelize,
    User: User
};
