const { DataTypes } = require('sequelize');

const sequelize = require('../database/sequelize');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  timestamps: false,
});

const init = async () => {
  await User.sync();
};

init();

module.exports = User;
