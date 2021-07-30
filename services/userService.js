require('dotenv').config();
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User, List } = require('../models');

const {
  contentNotFoundError,
  userExistsError,
} = require('./errors');

const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const secret = process.env.JWT_SECRET;

const verifyUserInfos = (infos) => (
  joi.object({
    name: joi.string().min(3).required(),
    age: joi.number().min(1).max(99).required(),
    email: joi.string().pattern(emailRegex).required(),
    password: joi.string().min(6).required(),
  }).validate(infos)
);

const verifyRegisterInfos = (infos) => (
  joi.object({
    userId: joi.number().required(),
    heroId: joi.string().length(24).required(),
  }).validate(infos)
)

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
    const users = await User.findAll({
      include: {
        model: List, as: 'list',
        attributes: { exclude: ['id', 'userId'] },
      },
    });
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
  } catch (error) {
    return { error };
  }
};

const getUserByIdService = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      include: {
        model: List, as: 'list',
        attributes: { exclude: ['id', 'userId'] },
      },
    });
    return ({
      code: 200,
      response: user,
    });
  } catch (error) {
    return { error };
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
    const registeredUser = await User.create(newUser);
    const { password, ...payload } = registeredUser.toJSON();
    const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
    const token = jwt.sign(payload, secret, jwtConfig);
    return ({
      code: 201,
      response: { token },
    });
  } catch (error) {
    return { error };
  }
}

const registerHeroOnListService = async (registerInfos) => {
  const { error } = verifyRegisterInfos(registerInfos);
  if (error) {
    return { error };
  }
  const { userId, heroId } = registerInfos;
  try {
    const result = await List.create({ userId, heroId });
    return ({
      code: 201,
      response: result.toJSON(),
    });
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  registerUserService,
  registerHeroOnListService,
};
