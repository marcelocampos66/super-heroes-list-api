const { User } = require('../models');

const { userExistsError } = require('../error/errors');

const getUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ where: { email } });
    return result;
  } catch (e) {
    console.error(e.message);
    return;
  }
}

module.exports = async (req, res, next) => {
  const { body: { email } } = req;
  const userExists = await getUserByEmail(email);
  if (userExists) {
    return res.status(422).json(userExistsError);
  }
  return next();
};
