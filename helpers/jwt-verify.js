const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtVerify = async (token) => {
  try {
    return await jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }
};

module.exports = jwtVerify;
