const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user');
const { JWT_SECRET } = require('./../config/index');

const userService = new User();
class Auth {
  async login(payload) {
    const { email, password } = payload;
    const user = await userService.getUser({ email });
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      return this.#getUserData(user);
    }
    return {
      error: true,
      message: 'Las credenciales no son correctas',
    };
  }

  async signup(payload) {
    if (payload.password) {
      payload.password = await this.#encrypt(payload.password);
    }
    const user = await userService.createUser(payload);
    if (user.error) {
      return user;
    }

    return this.#getUserData(user);
  }

  #createToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    });
    return token;
  }

  async #encrypt(payload) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(payload, salt);

      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  async #compare(payload, password) {
    return await bcrypt.compare(password, payload);
  }

  #getUserData(user) {
    const userData = {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role
    };

    const token = this.#createToken(userData);
    return {
      user: userData,
      token,
    };
  }
}

module.exports = Auth;
