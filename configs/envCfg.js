require('dotenv').config();

module.exports = () => {
  const { PORT, DB_URL, JWT_SECRET } = process.env;
  if (!process.env.PORT || !process.env.DB_URL || !process.env.JWT_SECRET) {
    const {
      PORT = 4000,
      DB_URL = 'mongodb://localhost:27017/newsdb',
      JWT_SECRET = 'SECRET'
    } = process.env;
    return {
      PORT,
      DB_URL,
      JWT_SECRET,
    };
  } else {
    return {
      PORT,
      DB_URL,
      JWT_SECRET,
    };
  }
};
