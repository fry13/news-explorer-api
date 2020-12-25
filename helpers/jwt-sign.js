const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwtSign = (id) => jwt.sign({ id }, JWT_SECRET);

module.exports = jwtSign;
