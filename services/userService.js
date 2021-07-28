const User = require('../models/user');
const joi = require('joi');

const {
  contentNotFoundError,
  userExistsError,
} = require('./errors');

const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const verifyUserInfos = (infos) => (
  joi.object({
    name: joi.string().min(3).required(),
    age: joi.number().min(1).max(99).required(),
    email: joi.string().pattern(emailRegex).required(),
    password: joi.string().min(6).required(),
  }).validate(infos)
);

const getUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ where: { email: email  } });
    return result;
  } catch (e) {
    console.error(e.message);
    return;
  }
}

const getAllUsersService = async () => {
  try {
    const users = await User.findAll();
    if (!users) {
      return ({
        code: 404,
        response: contentNotFoundError,
      });
    }
    const infos = users
      .map(({ dataValues: { password, ...necessaryInfos }}) => necessaryInfos);
    return ({
      code: 200,
      response: infos,
    });
  } catch (e) {
    return { error: e };
  }
};

const registerUserService = async (user) => {
  const { name, age, email, password } = user;
  const { error } = verifyUserInfos({ name, age, email, password });
  if (error) {
    return { error };
  }
  const newUser = { name, age, email, password };
  const userExists = await getUserByEmail(email);
  if (userExists) {
    return ({
      code: 422,
      response: userExistsError,
    })
  }
  newUser.role = 'user';
  try {
    const { dataValues } = await User.create(newUser);
    const { password, ...necessaryInfos } = dataValues;
    return ({
      code: 201,
      response: necessaryInfos,
    });
  } catch (e) {
    return { error: e };
  }
}

module.exports = {
  getAllUsersService,
  registerUserService,
};
