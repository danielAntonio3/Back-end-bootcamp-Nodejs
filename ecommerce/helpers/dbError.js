const validationError = require('./validationError');
const duplicatedError = require('./duplicatedError');

function dbError(error) {
  //console.log(error);
  if (error.code === 11000) {
    return {
      created: false,
      errors: duplicatedError(error.keyValue),
    };
  }
  // Error en la validación de los datos
  return {
    created: false,
    errors: validationError(error.errors),
  };
}

module.exports = dbError;
