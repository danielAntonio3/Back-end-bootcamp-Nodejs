const UserModel = require('./../models/user');

class User {
  async getAllUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async getUser(payload) {
    try {
      const user = await UserModel.findOne({ email: payload.email });
      return user;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async createUser(payload) {
    try {
      const user = await UserModel.create(payload);
      return user;
    } catch (error) {
      console.log('Error:', error);
      if (error.code === 11000) {
        const message = `El correo "${error.keyValue.email}" ya está en uso`;

        return {
          error: true,
          message,
        };
      }
    }
  }

  async updateUser(id, payload) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return user;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async deleteUser(id) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      console.log('Error:', error);
    }
  }
}

module.exports = User;
