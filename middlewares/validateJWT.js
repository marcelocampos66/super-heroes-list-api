require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateJWT = (req, res, next) => {
  const { headers: { authorization } } = req;
  if (!authorization) {
    return res.status(401).json({
      type: 'invalid_token',
      message: 'Token not found',
    });
  }
  try {
    const payload = jwt.verify(authorization, secret);
    if (!payload) {
      return res.status(401).json({
        type: 'invalid_token',
        message: 'Expired or invalid token',
      });
    }
    req.payload = payload;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validateJWT;