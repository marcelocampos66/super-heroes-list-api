const joi = require('joi');

const verifyRegisterInfos = (infos) => (
  joi.object({
    userId: joi.number().required(),
    heroId: joi.string().length(24).required(),
  }).validate(infos)
);

module.exports = (req, _res, next) => {
  const { params: { heroId }, payload } = req;
  const userId = payload.id;
  const { error } = verifyRegisterInfos({ userId, heroId });
  if (error) {
    return next(error);
  }
  return next();
};
