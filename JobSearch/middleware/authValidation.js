const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config');

function authValidation(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    // req.user = decoded;
    return next();
  }

  return res.status(401).json({
    error: true,
    message: 'No tienes permisos suficientes',
  });
}

module.exports = authValidation;
