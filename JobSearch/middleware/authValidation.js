const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config');

function authValidation(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
      } catch ({ name, message }) {
        return res.status(403).json({
          error: true,
          message,
          type: name,
        });
      }
    }
  }
  return res.status(403).json({
    error: true,
    message: 'Insufficient permissions',
  });
}

const acceptRoles = (...roles) => {
  return (req = request, res = response, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(401).json(
        {
          msg: 'Insufficient permissions'
        });
    }
    next();
  }

}

module.exports = { acceptRoles, authValidation };
