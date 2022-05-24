const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./user');
const validationError = require('../helpers/validationError');
const { JWT_SECRET } = require('./../config/index');

const userService = new User();
class Auth {
  async login(data) {
    const { email, password } = data;

    const user = await userService.getByEmail(email);

    if (user && (await this.#compare(password, user.password))) {
      return this.#getUserData(user);
    }

    return {
      success: false,
      errors: 'Las credenciales son incorrectas',
    };
  }

  async signup(data) {
    if (data && data.password) {
      data.password = await this.#encrypt(data.password);
    }
    const result = await userService.create(data);
    if (!result.created) {
      return {
        success: false,
        errors: result.errors,
      };
    }

    return this.#getUserData(result.user);
  }

  #getUserData(user) {
    const userData = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    const token = this.#createToken(userData);
    return {
      user: userData,
      token,
    };
  }

  #createToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    });
    return token;
  }

  async #encrypt(string) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(string, salt);

      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  async #compare(string, hash) {
    try {
      return await bcrypt.compare(string, hash);
    } catch (error) {
      return false;
    }
  }
}

module.exports = Auth;
