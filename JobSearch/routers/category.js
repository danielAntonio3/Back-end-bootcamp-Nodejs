const { Router } = require('express');
const Category = require('./../services/category');
const { authValidation, acceptRoles } = require('../middleware/authValidation');

function categories(app) {
  const router = new Router();
  const categoryService = new Category();

  app.use('/api/category', router);

  router.get('/', async (req, res) => {
    const categories = await categoryService.getAllCategory();
    return res.status(200).json({
      data: categories,
    });
  });

  router.get('/filter', async (req, res) => {
    const categories = await categoryService.getCategory(req.query);
    return res.status(200).json({
      data: categories,
    });
  });

  router.post('/', [authValidation, acceptRoles('admin')], async (req, res) => {
    const categories = await categoryService.createCategory(req.body);
    return res.status(201).json({
      data: categories,
    });
  });

  router.put('/:id', [authValidation, acceptRoles('admin')], async (req, res) => {
    const categories = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      data: categories,
    });
  });

  router.delete('/:id', [authValidation, acceptRoles('admin')], async (req, res) => {
    const categories = await categoryService.deleteCategory(req.params.id);
    return res.status(200).json({
      data: categories,
    });
  });
}

module.exports = categories;
