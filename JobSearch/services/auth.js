const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config/index');

class Auth {
  login(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}

module.exports = Auth;
