const joi = require('joi');

const verifyPage = (page) => (
  joi.number().integer().min(1).required().validate(page)
);

module.exports = (req, _res, next) => {
  const { query: { page } } = req;
  const { error } = verifyPage(page);
  if (error) {
    return next(error);
  }
  return next();
}
