const { Router } = require('express');
const auth = require('./../services/auth');
const { authResponse, deleteCookie } = require('../helpers/authResponse');

function auths(app) {
  const authService = new auth();
  const router = new Router();

  app.use('/api/auth', router);

  router.post('/login', async (req, res) => {
    const result = await authService.login(req.body);

    return authResponse(res, result, 401);
  });

  router.post('/signup', async (req, res) => {
    const result = await authService.signup(req.body);

    return authResponse(res, result, 400);
  });

  router.get('/logout', (req, res) => {
    return deleteCookie(res);
  });
}

module.exports = auths;
