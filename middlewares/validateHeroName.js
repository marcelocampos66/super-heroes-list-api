const joi = require('joi');

const verifyHeroName = (name) => (
  joi.string().min(3).required().validate(name)
);

module.exports = (req, _res, next) => {
  const { query: { name } } = req;
  const { error } = verifyHeroName(name);
  if (error) {
    return next(error);
  }
  return next();
}
