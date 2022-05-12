const CategoryModel = require('./../models/category');

class Category {
  async getAllCategory() {
    try {
      const categories = await CategoryModel.find().populate('job', 'name country description');
      return categories;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async getCategory(payload) {
    try {
      const categories = await CategoryModel.findOne(payload).populate('job', 'name country description');
      return categories;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async createCategory(payload) {
    try {
      const categories = await CategoryModel.create(payload);
      return categories;
    } catch (error) {
      console.log('Error:', error);
      if (error.code === 11000) {
        const message = `The category ${error.keyValue.name} is already exist.`;

        return {
          error: true,
          message,
        };
      }
    }
  }

  async updateCategory(id, payload) {
    try {
      const categories = await CategoryModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return categories;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async deleteCategory(id) {
    try {
      const categories = await CategoryModel.findByIdAndDelete(id);
      return categories;
    } catch (error) {
      console.log('Error:', error);
    }
  }
}

module.exports = Category;
