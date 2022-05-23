const { Router } = require('express');
const auth = require('./../services/auth');

function auths(app) {
  const authService = new auth();
  const router = new Router();

  app.use('/api/auth', router);

  router.post('/login', async (req, res) => {
    const result = await authService.login(req.body);
    return res.status(result.error ? 400 : 200).json({
      result,
    });
  });

  router.post('/signup', async (req, res) => {
    const result = await authService.signup(req.body);

    return res.status(result.error ? 400 : 200).json(result);
  });
}

module.exports = auths;
