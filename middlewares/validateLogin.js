const joi = require('joi');

const verifyLoginInfos = (infos) => (
  joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }).validate(infos)
);

module.exports = (req, _res, next) => {
  const { body: { email, password } } = req;
  const { error } = verifyLoginInfos({ email, password });
  if (error) {
    return next(error);
  }
  return next();
};
