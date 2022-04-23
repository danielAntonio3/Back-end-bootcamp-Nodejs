require('dotenv').config();

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

module.exports = config;
