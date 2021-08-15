const joi = require('joi');

const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const verifyUserInfos = (infos) => (
  joi.object({
    name: joi.string().min(3).required(),
    age: joi.number().min(1).max(99).required(),
    email: joi.string().pattern(emailRegex).required(),
    password: joi.string().min(6).required(),
    image: joi.string(),
  }).validate(infos)
);

module.exports = (req, _res, next) => {
  const { body: { name, age, email, password, image } } = req;
  const { error } = verifyUserInfos({ name, age, email, password, image });
  if (error) {
    return next(error);
  }
  return next();
};
