const { Router } = require('express');
const auth = require('./../services/auth');

function auths(app) {
  const authService = new auth();
  const router = new Router();

  app.use('/api/auth', router);

  router.get('/login', (req, res) => {
    const token = authService.login(req.body);
    return res.status(200).json({
      token,
    });
  });
}

module.exports = auths;
