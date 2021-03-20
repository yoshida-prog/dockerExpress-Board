const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('my_mysql_db', 'root', 'root', {
    host: 'my_mysql',
    dialect: 'mysql',
  });

const User = sequelize.define('Users', {
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
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
},{
  freezeTableName: true
});

const Post = sequelize.define('Posts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userID: {
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },{
    freezeTableName: true
});

module.exports = {
    sequelize: sequelize,
    User: User,
    Post: Post
};
