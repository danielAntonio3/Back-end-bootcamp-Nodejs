const { Router } = require('express');
const { authValidation, acceptRoles } = require('../middleware/authValidation');
const User = require('./../services/user');

function Users(app) {
  const userService = new User();
  const router = new Router();

  app.use('/api/users', router);

  router.get('/', [authValidation, acceptRoles('admin')], async (req, res) => {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      data: users,
    });
  });

  router.post('/', async (req, res) => {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      data: user,
    });
  });

  router.put('/:id', async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      data: user,
    });
  });

  router.delete('/:id', [authValidation, acceptRoles('admin')], async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    return res.status(200).json({
      data: user,
    });
  });
}

module.exports = Users;
