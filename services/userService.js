require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, List } = require('../models');

const {
  contentNotFoundError,
  userUnexistsError,
} = require('../utils/errors');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
const transporter = require('../utils/transporter');

const getUserByEmailAndPassword = async (login) => {
  const { email, password } = login;
  try {
    const user = await User.findOne({ where: { email, password } });
    const result = user.dataValues
    delete result.password;
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
        type: 'not_found',
        response: contentNotFoundError,
      });
    }
    const infos = users
      .map(({ dataValues: { password, ...necessaryInfos }}) => necessaryInfos);
    return ({
      type: 'ok',
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
      type: 'ok',
      response: user.toJSON(),
    });
  } catch (error) {
    return { error };
  }
};

const loginUserService = async (login) => {
  const findUser = await getUserByEmailAndPassword(login);
  if (!findUser) {
    return ({
      type: 'not_found',
      response: userUnexistsError,
    })
  }
  const { image, ...necessaryInfos } = findUser;
  const token = jwt.sign(necessaryInfos, secret, jwtConfig);
  return ({
    type: 'ok',
    response: { token },
  });
}

const registerUserService = async (user) => {
  const { name, age, email, password, image } = user;
  const newUser = { name, age, email, password, image, role: 'user' };
  try {
    const registeredUser = await User.create(newUser);
    const { password, image, ...payload } = registeredUser.toJSON();
    const token = jwt.sign(payload, secret, jwtConfig);
    return ({
      type: 'created',
      response: { token },
    });
  } catch (error) {
    return { error };
  }
}

const registerHeroOnListService = async (registerInfos) => {
  const { userId, heroId } = registerInfos;
  try {
    const result = await List.create({ userId, heroId });
    return ({
      type: 'ok',
      response: result.toJSON(),
    });
  } catch (error) {
    return { error };
  }
};

const deleteHeroOfListService = async (registerInfos) => {
  const { userId, heroId } = registerInfos;
  try {
    await List.destroy({ where: { userId, heroId } });
    return ({ type: 'no_content' });
  } catch (error) {
    return { error };
  }
};

const updateUserInfosService = async (id, newInfos) => {
  const { name, age, email, password, image } = newInfos;
  try {
    await User.update(
      { name, age, email, password, image },
      { where: { id } },
    );
    const updatedUser = await User.findOne({
      where: { id },
      include: {
        model: List, as: 'list',
        attributes: { exclude: ['id', 'userId'] },
      },
    });
    return ({
      type: 'ok',
      response: updatedUser,
    });
  } catch (error) {
    return { error };
  }
};

const recoverPasswordService = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ({
        type: 'not_found',
        response: userUnexistsError,
      });
    }
    const { password, name } = user;
    await transporter.sendMail({
      text: `Hello ${name}!\n \nYour password is: ${password}\n \nThanks!`,
      subject: 'Password recovery',
      from: 'Super Heroes List Team <superheroeslist.contato@gmail.com>',
      to: email,
      // html: `<p>HTML version of the message: ${password}</p>`,
    });
    return ({
      type: 'ok',
      response: { message: 'Email enviado com sucesso!' }
    });
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getAllUsersService,
  loginUserService,
  getUserByIdService,
  registerUserService,
  registerHeroOnListService,
  deleteHeroOfListService,
  updateUserInfosService,
  recoverPasswordService,
};
